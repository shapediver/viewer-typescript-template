import { Api, Parameter, Controls, Overlays, Export } from 'shapediver-types';

export class SdViewerControls {

    private api: Api.ApiInterfaceV2;

    /**
     * @param api the ShapeDiver Viewer API instance to use
     * @param options options for instantiating the dat.gui
     */
    constructor(api : Api.ApiInterfaceV2)
    {
        this.api = api;  
    }

    /**
     * Hides controls for all registered parameters 
     */
    public hideAllParameterControls() : void
    {
        this.toggleAllParameters(false);
    }

    /**
     * Shows controls for all registered parameters 
     */
    public showAllParameterControls() : void
    {
        this.toggleAllParameters(true);
    }

    private toggleAllParameters(show : boolean) : void {
        const params : Parameter.ParameterDefinition[] = [];
        this.api.parameters.get().data.forEach( p => {
            params.push({id: p.id, hidden: !show});
        });
        this.api.parameters.updateProperties(params);
    }

    /**
     * Hides controls for all registered exports 
     */
    public hideAllExportControls() : void
    {
        this.toggleAllExports(false);
    }

    /**
     * Shows controls for all registered exports 
     */
    public showAllExportControls() : void
    {
        this.toggleAllExports(true);
    }

    private toggleAllExports(show : boolean) : void {
        const exports : Export.ExportDefinition[] = [];
        this.api.exports.get().data.forEach( p => {
            exports.push({id: p.id, hidden: !show});
        });
        this.api.exports.updateProperties(exports);
    }

    /**
     * Show or hide parameter controls tab
     * @param show 
     */
    public toggleControlsTab(show : boolean) : void
    {
        this.api.apps.overlays.buttonOnClick(Overlays.ButtonType.CONTROLS, show);
    }

    /**
     * Show or hide setting controls tab
     * @param show 
     */
    public toggleSettingsTab(show : boolean) : void
    {
        this.api.apps.overlays.buttonOnClick(Overlays.ButtonType.SETTINGS, show);
    }

    /**
     * Add a model parameter to the GUI
     * @param filter filter to use for searching the parameter to add, must result in a single parameter
     * @param name optional name to display in the GUI
     * @param folder optional GUI folder to add the parameter to
     */
    // public addParameter(filter : Parameter.ParameterDefinition, name? : string, folder : string = 'Parameters') : Promise<string> {
        
    // }

    /**
     * Add a slider to the GUI
     * @param name 
     * @param defval 
     * @param min 
     * @param max 
     * @param step 
     * @param cb 
     * @param folder 
     */
    // public addSlider(name : string, defval : number, min : number | undefined, max : number | undefined, step : number | undefined, cb : (v : number) => void, folder : string = 'Sliders') : Promise<string> {
       
    // }
    
    /**
     * Add a boolean toggle to the GUI
     * @param name 
     * @param defval 
     * @param cb 
     * @param folder 
     */
    // public addToggle(name : string, defval : boolean, cb : (v : boolean) => void, folder : string = 'Toggles') : Promise<string> {
        
    // }

    /**
     * Add a button to the GUI
     * @param name 
     * @param cb 
     * @param folder 
     */
    // public addButton(name : string, cb : () => void, folder : string = 'Buttons') : Promise<string> {
        
    // }

}

