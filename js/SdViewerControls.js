"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    /**
     * Add a control for a model parameter to the GUI
     * @param filter filter to use for searching the parameter to add, must result in a single parameter
     * @param name optional name to display in the GUI
     * @param group TODO optional GUI group to add the parameter to
     */
    SdViewerControls.prototype.addParameterControl = function (filter, name, group) {
        if (group === void 0) { group = 'Parameters'; }
        return __awaiter(this, void 0, void 0, function () {
            var params, def, param, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = this.api.parameters.get(filter).data;
                        if (params.length !== 1) {
                            return [2 /*return*/];
                        }
                        def = params[0];
                        param = this.mapParameter(def);
                        if (name)
                            param.name = name;
                        return [4 /*yield*/, this.api.apps.controls.createParameter(param)];
                    case 1:
                        id = _a.sent();
                        return [2 /*return*/, id];
                }
            });
        });
    };
    /**
     * Update an existing parameter control according to a (partial) parameter definition, e.g. in order to update min/max values of a slider
     * @param filter filter to use for searching the parameter to update, must result in a single parameter
     * @param def (partial) parameter definition to use for updating the control
     */
    SdViewerControls.prototype.updateParameterControl = function (filter, def) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * TODO to be replaced by a call to the viewer controls which must already contain this logic, no sense to duplicate this functionality
     * @param type
     */
    SdViewerControls.prototype.mapParameterType = function (type) {
        if (type === this.api.parameters.TYPE.BOOL) {
            return shapediver_types_1.Controls.ControlParameterType.CHECKBOX;
        }
        else if (type === this.api.parameters.TYPE.EVEN || type === this.api.parameters.TYPE.FLOAT || type === this.api.parameters.TYPE.INT || type === this.api.parameters.TYPE.ODD) {
            return shapediver_types_1.Controls.ControlParameterType.SLIDER;
        }
        else if (type === this.api.parameters.TYPE.COLOR) {
            return shapediver_types_1.Controls.ControlParameterType.COLOR;
        }
        else if (type === this.api.parameters.TYPE.FILE) {
            return shapediver_types_1.Controls.ControlParameterType.FILE;
        }
        else if (type === this.api.parameters.TYPE.STRING) {
            return shapediver_types_1.Controls.ControlParameterType.STRING;
        }
        return shapediver_types_1.Controls.ControlParameterType.STATICHTML;
    };
    /**
     * TODO to be replaced by a call to the viewer controls which must already contain this logic, no sense to duplicate this functionality
     * @param def
     */
    SdViewerControls.prototype.mapParameter = function (def) {
        def.visualization;
        var param = { type: this.mapParameterType(def.type) };
        param.name = def.name;
        param.value = def.defval;
        if (def.min)
            param.min = parseFloat(def.min);
        if (def.max)
            param.max = parseFloat(def.max);
        if (def.decimalplaces !== undefined)
            param.step = Math.pow(0.1, def.decimalplaces);
        param.link = { id: def.id, plugin: def.plugin };
        return param;
    };
    return SdViewerControls;
}());
exports.SdViewerControls = SdViewerControls;
//# sourceMappingURL=SdViewerControls.js.map