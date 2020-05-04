"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dat_gui_1 = require("dat.gui");
var SdViewerDatGUI = /** @class */ (function () {
    function SdViewerDatGUI(api, options) {
        this.api = api;
        this.gui = new dat_gui_1.GUI(options);
    }
    SdViewerDatGUI.prototype.addOrGetFolder = function (name, openIfNew) {
        if (openIfNew === void 0) { openIfNew = true; }
        var folder = this.gui.__folders[name];
        if (!folder) {
            folder = this.gui.addFolder(name);
            if (openIfNew) {
                folder.open();
            }
        }
        return folder;
    };
    SdViewerDatGUI.prototype.addParameter = function (filter, name, folder) {
        var _this = this;
        if (folder === void 0) { folder = 'Parameters'; }
        var params = this.api.parameters.get(filter).data;
        if (params.length !== 1) {
            return;
        }
        var param = params[0];
        var isBool = param.type === 'Bool';
        var isNum = param.type === 'Float' || param.type === 'Int' || param.type === 'Even' || param.type === 'Odd';
        if (!isBool && !isNum) {
            return;
        }
        name = name ? name : param.name;
        var valueObject = {};
        valueObject[name] = param.value;
        var controller = this.addOrGetFolder(folder).add(valueObject, name);
        if (isNum) {
            controller = controller.min(Number.parseFloat(param.min));
            controller = controller.max(Number.parseFloat(param.max));
            if (param.type === 'Int') {
                controller = controller.step(1);
            }
            else if (param.type === 'Odd' || param.type === 'Even') {
                controller = controller.step(2);
            }
            else if (param.type === 'Float') {
                controller = controller.step(Math.pow(0.1, param.decimalplaces));
            }
        }
        controller = controller.onFinishChange(function (v) {
            _this.api.parameters.updateAsync({ id: param.id, value: controller.getValue() });
        });
        return controller;
    };
    SdViewerDatGUI.prototype.addSlider = function (name, defval, min, max, step, cb, folder) {
        if (folder === void 0) { folder = 'Sliders'; }
        var valueObject = {};
        valueObject[name] = defval;
        return this.addOrGetFolder(folder).add(valueObject, name, min, max, step).onChange(function (v) {
            cb(v);
        });
    };
    SdViewerDatGUI.prototype.addToggle = function (name, defval, cb, folder) {
        if (folder === void 0) { folder = 'Toggles'; }
        var valueObject = {};
        valueObject[name] = defval;
        return this.addOrGetFolder(folder).add(valueObject, name).onChange(function (v) {
            cb(v);
        });
    };
    SdViewerDatGUI.prototype.addButton = function (name, cb, folder) {
        if (folder === void 0) { folder = 'Buttons'; }
        var valueObject = {};
        valueObject[name] = function () { };
        return this.addOrGetFolder(folder).add(valueObject, name).onChange(function () {
            cb();
        });
    };
    return SdViewerDatGUI;
}());
exports.SdViewerDatGUI = SdViewerDatGUI;
//# sourceMappingURL=SdViewerDatGUI.js.map