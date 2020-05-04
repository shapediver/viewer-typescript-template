import { Api, Parameter } from 'shapediver-types';
import { GUI, GUIController, GUIParams } from 'dat.gui';

export class SdViewerDatGUI {

    private api: Api.ApiInterfaceV2;

    private gui: GUI;

    constructor(api : Api.ApiInterfaceV2, options? : GUIParams)
    {
        this.api = api;
        this.gui = new GUI(options);
    }

    private addOrGetFolder(name : string, openIfNew = true) : GUI {
        let folder = (<any>this.gui.__folders)[name];
        if (!folder) {
            folder = this.gui.addFolder(name);
            if (openIfNew) {
                folder.open();
            }
        }
        return folder;
    }

    public addParameter(filter : Parameter.ParameterDefinition, name? : string, folder : string = 'Parameters') : GUIController | undefined {
        
        const params = this.api.parameters.get(filter).data;
        if (params.length !== 1) {
            return;
        }
        const param = params[0];

        const isBool = param.type === 'Bool';
        const isNum = param.type === 'Float' || param.type === 'Int' || param.type === 'Even' || param.type === 'Odd';

        if (!isBool && !isNum) {
            return;
        }

        name = name ? name : <string>param.name;
        let valueObject : any= {};
        valueObject[name] = param.value;
        let controller = this.addOrGetFolder(folder).add(valueObject, name);

        if (isNum) {
            controller = controller.min(Number.parseFloat(<string>param.min));
            controller = controller.max(Number.parseFloat(<string>param.max));
            if (param.type === 'Int') {
                controller = controller.step(1);
            } else if (param.type === 'Odd' || param.type === 'Even') {
                controller = controller.step(2);
            } else if (param.type === 'Float') {
                controller = controller.step(Math.pow(0.1, <number>param.decimalplaces));
            }
        }
        
        controller = controller.onFinishChange((v) => {
            this.api.parameters.updateAsync({id: param.id, value: controller.getValue()});
        });

        return controller;
    }

    public addSlider(name : string, defval : number, min : number | undefined, max : number | undefined, step : number | undefined, cb : (v : number) => void, folder : string = 'Sliders') : GUIController {
        let valueObject : any= {};
        valueObject[name] = defval;
        return this.addOrGetFolder(folder).add(valueObject, name, min, max, step).onChange((v) => {
            cb(v);
        });
    }
    
    public addToggle(name : string, defval : boolean, cb : (v : boolean) => void, folder : string = 'Toggles') : GUIController {
        let valueObject : any = {};
        valueObject[name] = defval;
        return this.addOrGetFolder(folder).add(valueObject, name).onChange((v) => {
            cb(v);
        });
    }

    public addButton(name : string, cb : () => void, folder : string = 'Buttons') : GUIController {
        let valueObject : any = {};
        valueObject[name] = () => {};
        return this.addOrGetFolder(folder).add(valueObject, name).onChange(() => {
            cb();
        });
    }

}

