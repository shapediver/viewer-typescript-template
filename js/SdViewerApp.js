"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var SdViewerAppBase_1 = require("./SdViewerAppBase");
var SdViewerDatGUI_1 = require("./SdViewerDatGUI");
var SdViewerControls_1 = require("./SdViewerControls");
var SdViewerApp = /** @class */ (function (_super) {
    __extends(SdViewerApp, _super);
    /**
     *
     * @param api ShapeDiver API object
     */
    function SdViewerApp(api) {
        var _this = _super.call(this, api) || this;
        /**
         * model to load
         */
        _this.ticket = 'c46b0bd423988b6d411121108d7611a9d2ffa2f6022071f45b37b1730fd9820c6a7d1c3a5780df23ae8bbac303e3e618697f8ba47bb0ffabe24c8843760976a743adcf54028cf388fd5e4c688ca9e5cc1450ef9b8ba3015c769d92c3deeade71a6ba7ece2b5b37a11befbaa6c2642cc8e81660892033-35f1dee65073c6c7bcd52a7282f99ad7';
        _this.modelViewUrl = 'eu-central-1';
        /**
         * helpers for displaying status information
         */
        _this.infoDomTop = document.getElementById('info-top');
        _this.infoDomBottom = document.getElementById('info-bottom');
        _this.sceneEventListenerTokens = [];
        return _this;
    }
    /**
     * Load the model
     */
    SdViewerApp.prototype.loadModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commPluginOptions, settingsToOverride, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        commPluginOptions = {
                            ticket: this.ticket,
                            modelViewUrl: this.modelViewUrl,
                        };
                        settingsToOverride = {};
                        _a = this;
                        return [4 /*yield*/, this.addModelToScene(commPluginOptions, null, settingsToOverride)];
                    case 1:
                        _a.modelRuntimeId = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * create custom controls based on the ShapeDiver Viewer controls
     */
    SdViewerApp.prototype.createCustomControls = function () {
        if (!this.controls) {
            this.controls = new SdViewerControls_1.SdViewerControls(this.api);
            this.controls.hideAllParameterControls();
            this.controls.hideAllExportControls();
        }
    };
    /**
     * create custom controls based on dat.gui
     */
    SdViewerApp.prototype.createDatGui = function () {
        var _this = this;
        if (!this.datgui) {
            this.datgui = new SdViewerDatGUI_1.SdViewerDatGUI(this.api);
            // parameters
            this.datgui.addParameter({ name: 'Length (mm)' });
            this.datgui.addParameter({ name: 'Width (mm)' });
            this.datgui.addParameter({ name: 'Height (mm)' });
            this.datgui.addParameter({ name: 'Show Dimensions?' }, 'Dimensions');
            // toggles
            this.datgui.addToggle('Show status', false, function (v) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.enableStatusDisplay(v);
                    return [2 /*return*/];
                });
            }); }, 'Toggles');
            this.datgui.addToggle('Blur when busy', true, function (v) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.api.updateSettingAsync('blurSceneWhenBusy', false);
                    return [2 /*return*/];
                });
            }); }, 'Toggles');
            // sliders
            var scaleMatrix_1 = new THREE.Matrix4();
            this.datgui.addSlider('Scale', 1, 0.5, 2, 0.01, function (v) {
                if (_this.modelRuntimeId) {
                    scaleMatrix_1.makeScale(v, v, v);
                    _this.api.scene.setTransformation(shapediver_types_1.Scene.TRANSFORMATIONTYPE.PLUGIN, _this.modelRuntimeId, [scaleMatrix_1]);
                }
            }, 'Sliders');
        }
    };
    SdViewerApp.prototype.updateStatusTop = function (text) {
        if (this.infoDomTop) {
            if (text) {
                this.infoDomTop.innerHTML = text;
            }
            else {
                this.infoDomTop.innerHTML = '';
            }
        }
    };
    SdViewerApp.prototype.updateStatusBottom = function (event) {
        if (this.infoDomBottom) {
            if (event && event.framerate) {
                var statusText = parseInt(event.framerate + '') + ' fps';
                this.infoDomBottom.innerHTML = statusText;
            }
            else {
                this.infoDomBottom.innerHTML = '';
            }
        }
    };
    SdViewerApp.prototype.enableStatusDisplay = function (enable) {
        var _this = this;
        if (enable) {
            this.sceneEventListenerTokens.push(this.api.scene.addEventListener(shapediver_types_1.Scene.EVENTTYPE.FRAMERATE, function (event) {
                _this.updateStatusBottom(event);
            }).data);
        }
        else {
            this.sceneEventListenerTokens.forEach(function (token) {
                _this.api.scene.removeEventListener(token);
            });
            this.updateStatusBottom();
            this.updateStatusTop();
        }
    };
    return SdViewerApp;
}(SdViewerAppBase_1.SdViewerAppBase));
exports.SdViewerApp = SdViewerApp;
//# sourceMappingURL=SdViewerApp.js.map