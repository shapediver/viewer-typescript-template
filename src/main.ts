import { SdViewerArApp as App } from './SdViewerArApp';

// ShapeDiver Viewer Initialisation
const initSdvApp = async function (/*event*/) {
    
    // create viewer
    const api = (<any>window).SDVApp.ParametricViewer({
        useModelSettings: true,
        createButtons: true,
        arkitbridge: true,
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

    // start AR session
    await app.runSession();
   
};

// there is a slight chance that loading has been completed already
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSdvApp, false);
} else {
    initSdvApp();
}
