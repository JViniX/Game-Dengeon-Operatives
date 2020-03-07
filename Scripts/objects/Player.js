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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Player(imagePath, name, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            // PRIVATE INSTANCE MEMBERS
            _this._kleft = 37;
            _this._kup = 38;
            _this._kright = 39;
            _this._kdown = 40;
            _this.name = name;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Player.prototype.Move = function (e) {
            switch (e.keyCode) {
                case this._kleft:
                    this.x = this.x - 10;
                    this.rotation = -90;
                    break;
                case this._kup:
                    this.y = this.y - 10;
                    this.rotation = 0;
                    break;
                case this._kright:
                    this.x = this.x + 10;
                    this.rotation = 90;
                    break;
                case this._kdown:
                    this.y = this.y + 10;
                    this.rotation = 180;
                    break;
            }
        };
        Player.prototype.Start = function () {
        };
        Player.prototype.Update = function () {
        };
        Player.prototype.Reset = function () {
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map