"use strict";
/**
 * Julio Vinicius A. de Carvalho
 * 301016383
 * Feb 15, 2020
 * Slot Machine - Assignment 1
 * COMP397 - Web Gaming Development
 */
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
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        // constructor
        function Image(imagePath, imageName, x, y, isCentered) {
            if (imagePath === void 0) { imagePath = config.Game.ASSETS.getResult("placeholder"); }
            if (imageName === void 0) { imageName = 'ImageName'; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            _this.name = imageName;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Image.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Image.prototype.leaveScreen = function () {
            this.position.x = -200;
            this.position.y = -200;
        };
        Image.prototype.showAtScreen = function (newX, newY) {
            this.position.x = newX;
            this.position.y = newY;
        };
        Image.prototype.setImage = function (imagePath) {
            //this.image = new createjs.Bitmap(imagePath).image;
            var background;
            background.image = new createjs.Bitmap("").image;
        };
        Image.prototype.Start = function () {
        };
        Image.prototype.Update = function () {
        };
        Image.prototype.Reset = function () {
        };
        return Image;
    }(objects.GameObject));
    objects.Image = Image;
})(objects || (objects = {}));
//# sourceMappingURL=Image.js.map