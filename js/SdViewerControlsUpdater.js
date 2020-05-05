"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SdViewerControlsUpdater = /** @class */ (function () {
    /**
     *
     * @param api the ShapeDiver Viewer API instance to use
     * @param controls the controls to keep updated
     * @param dataName name of the data output to use for updating the controls
     */
    function SdViewerControlsUpdater(api, controls, dataName) {
        if (dataName === void 0) { dataName = 'controls'; }
        this.api = api;
        this.controls = controls;
    }
    return SdViewerControlsUpdater;
}());
exports.SdViewerControlsUpdater = SdViewerControlsUpdater;
//# sourceMappingURL=SdViewerControlsUpdater.js.map