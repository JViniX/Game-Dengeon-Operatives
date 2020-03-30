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
            _this.direction = objects.EnumDirections.UP;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
            //console.log("Player _checkBounds. " + this.halfWidth +" - " +this.halfHeight + " - "+ this.position.toString());
            if ((this.position.x - this.halfWidth <= 0) ||
                (this.position.x + this.halfWidth >= config.Game.SCREEN_WIDTH) ||
                (this.position.y - this.halfHeight <= 0) ||
                (this.position.y + this.halfHeight >= config.Game.SCREEN_HEIGHT)) {
                this.isColliding = true;
                //console.log("Player _checkBounds. Entrou " + this.x +" - " +this.y + " - "+ this.position.toString());
            }
        };
        // PUBLIC METHODS
        Player.prototype.gameover = function () {
            this.position.x = -100;
            this.position.y = -100;
        };
        Player.prototype.Move = function (e) {
            //console.log("e.keyCode: "+e.keyCode);
            var newDirection;
            switch (e.keyCode) {
                case this._kup:
                    newDirection = objects.EnumDirections.UP;
                    if (!this.isColliding || (this.direction != newDirection)) {
                        this.position.y = this.position.y - 10;
                        this.isColliding = false;
                    }
                    this.rotation = 0;
                    break;
                case this._kright:
                    newDirection = objects.EnumDirections.RIGHT;
                    if (!this.isColliding || (this.direction != newDirection)) {
                        this.position.x = this.position.x + 10;
                        this.isColliding = false;
                    }
                    this.rotation = 90;
                    break;
                case this._kdown:
                    newDirection = objects.EnumDirections.DOWN;
                    if (!this.isColliding || (this.direction != newDirection)) {
                        this.position.y = this.position.y + 10;
                        this.isColliding = false;
                    }
                    this.rotation = 180;
                    break;
                case this._kleft:
                    newDirection = objects.EnumDirections.LEFT;
                    if (!this.isColliding || (this.direction != newDirection)) {
                        this.position.x = this.position.x - 10;
                        this.isColliding = false;
                    }
                    this.rotation = -90;
                    break;
            }
            if (this.direction != newDirection) {
                this.direction = newDirection;
                var aux = this.height;
                this.height = this.width;
                this.width = aux;
            }
        };
        Player.prototype.Start = function () {
        };
        Player.prototype.Update = function () {
            this._checkBounds();
            //console.log("Player Updated. " + this.x +" - " +this.y + " - "+ this.position.toString());
        };
        Player.prototype.Reset = function () {
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map