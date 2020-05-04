import { SdViewerApp as App } from './SdViewerApp';

// ShapeDiver Viewer Initialisation
const initSdvApp = async function (/*event*/) {
    
    // create viewer
    const api = (<any>window).SDVApp.ParametricViewer({
        useModelSettings: true,
        createButtons: true,
    });

    // create app
    const app = new App(api);

    // set app and api as properties of window object
    (<any>window).app = app;
    (<any>window).api = api;

    // load model
    await app.loadModel();

    // create GUI
    app.createGui();
   
};

// there is a slight chance that loading has been completed already
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSdvApp, false);
} else {
    initSdvApp();
}
