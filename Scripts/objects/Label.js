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
var objects;
(function (objects) {
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        // constructor
        function Label(labelString, fontSize, fontFamily, fontColour, x, y, isCentered) {
            if (labelString === void 0) { labelString = "empty label"; }
            if (fontSize === void 0) { fontSize = "12px"; }
            if (fontFamily === void 0) { fontFamily = "Consolas"; }
            if (fontColour === void 0) { fontColour = "#000000"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, labelString, fontSize + " " + fontFamily, fontColour) || this;
            _this.labelString = labelString;
            _this.fontSize = fontSize;
            _this.fontFamily = fontFamily;
            _this.fontColour = fontColour;
            _this.isCentered = isCentered;
            _this._isDisappear = false;
            if (isCentered) {
                _this._isCentered = true;
                _this.regX = _this.getBounds().width * 0.5;
                _this.regY = _this.getMeasuredLineHeight() * 0.5;
            }
            _this.x = x;
            _this.y = y;
            return _this;
        }
        // methods
        Label.prototype.Update = function () {
            if (this._isDisappear && this.alpha > 0) {
                if (createjs.Ticker.getTicks() % 10 == 0) {
                    this.alpha = this.alpha - 0.1;
                }
            }
        };
        Label.prototype.Disappear = function () {
            this._isDisappear = true;
        };
        Label.prototype.Show = function () {
            this._isDisappear = false;
            this.alpha = 1.0;
        };
        Label.prototype.showAtScreen = function (newX, newY) {
            //this.Show()
            this.x = newX;
            this.y = newY;
        };
        Label.prototype.setText = function (newText) {
            this.text = newText; //.substring(0, 12);
            if (this._isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }
        };
        Label.prototype.getText = function () {
            return this.text.toString();
        };
        return Label;
    }(createjs.Text));
    objects.Label = Label;
})(objects || (objects = {}));
//# sourceMappingURL=Label.js.map