"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shapediver_types_1 = require("shapediver-types");
var SdViewerControls = /** @class */ (function () {
    /**
     * @param api the ShapeDiver Viewer API instance to use
     * @param options options for instantiating the dat.gui
     */
    function SdViewerControls(api) {
        this.api = api;
    }
    /**
     * Hides controls for all registered parameters
     */
    SdViewerControls.prototype.hideAllParameterControls = function () {
        this.toggleAllParameters(false);
    };
    /**
     * Shows controls for all registered parameters
     */
    SdViewerControls.prototype.showAllParameterControls = function () {
        this.toggleAllParameters(true);
    };
    SdViewerControls.prototype.toggleAllParameters = function (show) {
        var params = [];
        this.api.parameters.get().data.forEach(function (p) {
            params.push({ id: p.id, hidden: !show });
        });
        this.api.parameters.updateProperties(params);
    };
    /**
     * Hides controls for all registered exports
     */
    SdViewerControls.prototype.hideAllExportControls = function () {
        this.toggleAllExports(false);
    };
    /**
     * Shows controls for all registered exports
     */
    SdViewerControls.prototype.showAllExportControls = function () {
        this.toggleAllExports(true);
    };
    SdViewerControls.prototype.toggleAllExports = function (show) {
        var exports = [];
        this.api.exports.get().data.forEach(function (p) {
            exports.push({ id: p.id, hidden: !show });
        });
        this.api.exports.updateProperties(exports);
    };
    /**
     * Show or hide parameter controls tab
     * @param show
     */
    SdViewerControls.prototype.toggleControlsTab = function (show) {
        this.api.apps.overlays.buttonOnClick(shapediver_types_1.Overlays.ButtonType.CONTROLS, show);
    };
    /**
     * Show or hide setting controls tab
     * @param show
     */
    SdViewerControls.prototype.toggleSettingsTab = function (show) {
        this.api.apps.overlays.buttonOnClick(shapediver_types_1.Overlays.ButtonType.SETTINGS, show);
    };
    return SdViewerControls;
}());
exports.SdViewerControls = SdViewerControls;
//# sourceMappingURL=SdViewerControls.js.map