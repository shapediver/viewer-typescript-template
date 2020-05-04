import { Api, Camera, ArApi, Scene } from 'shapediver-types';
import { SdViewerAppBase } from './SdViewerAppBase';
import { SdViewerDatGUI } from './SdViewerDatGUI';

export class SdViewerArApp extends SdViewerAppBase {

    /**
     * model to load
     */
    private ticket: string = 'c46b0bd423988b6d411121108d7611a9d2ffa2f6022071f45b37b1730fd9820c6a7d1c3a5780df23ae8bbac303e3e618697f8ba47bb0ffabe24c8843760976a743adcf54028cf388fd5e4c688ca9e5cc1450ef9b8ba3015c769d92c3deeade71a6ba7ece2b5b37a11befbaa6c2642cc8e81660892033-35f1dee65073c6c7bcd52a7282f99ad7';
    private modelViewUrl: string = 'eu-central-1';

    /**
     * runtimeId of CommPlugin
     */
    private modelRuntimeId? : string;

    /**
     * we remember the camera position when switch AR camera sync on/off
     */
    private cameraPosAndTarget : Camera.CameraDefinition;

    /**
     * type of planes to detect
     */
    private planeDetection = ['horizontal'];

    /**
     * the dat.gui we are using
     */
    private gui? : SdViewerDatGUI;

    /**
     * helpers for displaying status information
     */
    private infoDomTop = document.getElementById('info-top');
    private infoDomBottom = document.getElementById('info-bottom');
    private arEventListenerTokens : Array<any> = [];
    private sceneEventListenerTokens : Array<any> = [];

    /**
     * 
     * @param api ShapeDiver API object
     */
    constructor(api : Api.ApiInterfaceV2)
    {
        super(api);
        this.cameraPosAndTarget = api.scene.camera.get().data;
    }

    /**
     * Load the model
     */
    public async loadModel() : Promise<void> {
        
        const commPluginOptions = {
            ticket: this.ticket,
            modelViewUrl: this.modelViewUrl,
        };

        const settingsToOverride = {
            scene: {
                camera: {
                    enableCameraControls: true,
                }
            },
            ar: {
                enableCameraSync: false,
                enableAutomaticPlacement: true
            }
        };

        this.modelRuntimeId = await this.addModelToScene(commPluginOptions, null, settingsToOverride);

        // TODO read unit system from model data output, set scale transformation accordingly

    }

    /**
     * start the AR session
     */
    public async runSession() : Promise<void> {
        if ( this.api.ar.getStatus().data.framework !== 'none') {
            return this.api.ar.runSession(this.planeDetection);
        } 
    }

    /**
     * create the GUI
     */
    public createGui() : void {
        if (!this.gui) {

            this.gui = new SdViewerDatGUI(this.api);

            // parameters
            this.gui.addParameter({name: 'Length (mm)'});
            this.gui.addParameter({name: 'Width (mm)'});
            this.gui.addParameter({name: 'Height (mm)'});
            this.gui.addParameter({name: 'Show Dimensions?'}, 'Dimensions');

            // toggles
            this.gui.addToggle('Camera sync', this.api.getSetting('ar.enableCameraSync'), async (v) => {
                this.api.scene.pause();
                await this.api.updateSettingsAsync({
                    ar: {enableCameraSync: v},
                    scene: {camera: {enableCameraControls: !v}}
                });
                if (!v) {
                    await this.api.scene.camera.updateAsync(this.cameraPosAndTarget, { duration: 0 });
                } else {
                    this.cameraPosAndTarget = this.api.scene.camera.get().data;
                }
                this.api.scene.resume();
            }, 'AR');

            this.gui.addToggle('Place object', this.api.getSetting('ar.enableAutomaticPlacement'), async (v) => {
                await this.api.updateSettingsAsync( {ar: {enableAutomaticPlacement: v}} );
            }, 'AR');

            const pauseSessionController = this.gui.addToggle('Pause session', false, async (v) => {
                if (v) {
                    await this.api.ar.pauseSession();
                } else {
                    await this.api.ar.runSession(this.planeDetection);
                }
            }, 'AR');

            this.gui.addToggle('Show status', false, async (v) => {
                this.enableStatusDisplay(v);
            }, 'AR');

            // buttons
            this.gui.addButton('Reset & Restart', async () => {
                this.api.ar.runSession(this.planeDetection, ['resetTracking', 'removeExistingAnchors']);
                if (this.modelRuntimeId) {
                    this.api.ar.resetPlacementAnchor(this.modelRuntimeId);
                }
                pauseSessionController.setValue(false);
            }, 'AR');
            
            // sliders
            const scaleMatrix = new THREE.Matrix4();
            this.gui.addSlider('Scale', 1, 0.1, 10, 0.01, (v) => {
                if (this.modelRuntimeId) {
                    scaleMatrix.makeScale(v,v,v);
                    this.api.scene.setTransformation(Scene.TRANSFORMATIONTYPE.PLUGIN, this.modelRuntimeId, [scaleMatrix]);
                }
            }, 'AR');
            
        }
    }

    private updateStatusTop(event? : ArApi.AREvent) {
        if (this.infoDomTop) {
            if (event) {
                let statusText = 'tracking: ' + event.tracking;
                statusText += '<br> mapping: ' + event.worldMapping;
                this.infoDomTop.innerHTML = statusText;
            } 
            else {
                this.infoDomTop.innerHTML = '';
            }
        }
    }

    private updateStatusBottom(event? : Api.Event) {
        if (this.infoDomBottom) {
            if (event && event.framerate) {
                let statusText = parseInt(event.framerate + '') + ' fps';
                this.infoDomBottom.innerHTML = statusText;
            } 
            else {
                this.infoDomBottom.innerHTML = '';
            }
        }
    }

    private enableStatusDisplay(enable : boolean) {
        if (enable) {
            this.arEventListenerTokens.push( 
                this.api.ar.addEventListener(ArApi.EVENTTYPE.STATUS_TRACKING, (arevent : ArApi.AREvent) => {
                    this.updateStatusTop(arevent);
                }).data 
            );
            this.arEventListenerTokens.push( 
                this.api.ar.addEventListener(ArApi.EVENTTYPE.STATUS_MAPPING, (arevent : ArApi.AREvent) => {
                    this.updateStatusTop(arevent);
                }).data 
            );
            this.sceneEventListenerTokens.push( 
                this.api.scene.addEventListener(Scene.EVENTTYPE.FRAMERATE, (event : Api.Event) => {
                    this.updateStatusBottom(event);
                }).data 
            );
        } 
        else {
            this.arEventListenerTokens.forEach((token) => {
                this.api.ar.removeEventListener(token);
            });
            this.updateStatusTop();

            this.sceneEventListenerTokens.forEach((token) => {
                this.api.scene.removeEventListener(token);
            });
            this.updateStatusBottom();
        }
    }

}

