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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Bullet(imageString, name, shooter) {
            if (imageString === void 0) { imageString = config.Game.ASSETS.getResult("placeholder"); }
            if (name === void 0) { name = 'BulletName'; }
            var _this = this;
            switch (shooter.direction) {
                case objects.EnumDirections.DOWN:
                    _this = _super.call(this, imageString, shooter.position.x - 10, shooter.position.y + shooter.halfHeight, true) || this;
                    break;
                case objects.EnumDirections.LEFT:
                    _this = _super.call(this, imageString, shooter.position.x - shooter.halfWidth, shooter.position.y - 10, true) || this;
                    break;
                case objects.EnumDirections.UP:
                    _this = _super.call(this, imageString, shooter.position.x + 10, shooter.position.y - shooter.halfHeight, true) || this;
                    break;
                case objects.EnumDirections.RIGHT:
                    _this = _super.call(this, imageString, shooter.position.x + shooter.halfWidth, shooter.position.y + 10, true) || this;
                    break;
            }
            _this.name = name;
            _this._direction = shooter.direction;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Bullet.prototype._checkBounds = function () {
            if ((this.y >= config.Game.SCREEN_HEIGHT + this.height) ||
                (this.x >= config.Game.SCREEN_WIDTH + this.width)) {
                this.isColliding = true;
            }
        };
        Bullet.prototype._move = function () {
            switch (this._direction) {
                case objects.EnumDirections.UP:
                    this.position = objects.Vector2.subtract(this.position, this.velocity);
                    break;
                case objects.EnumDirections.RIGHT:
                    this.position = objects.Vector2.add(this.position, this.velocity);
                    break;
                case objects.EnumDirections.DOWN:
                    this.position = objects.Vector2.add(this.position, this.velocity);
                    break;
                case objects.EnumDirections.LEFT:
                    this.position = objects.Vector2.subtract(this.position, this.velocity);
                    break;
            }
        };
        // PUBLIC METHODS
        Bullet.prototype.Start = function () {
            createjs.Sound.play("laser1");
            this.Reset();
        };
        Bullet.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        Bullet.prototype.Reset = function () {
            this._verticalSpeed = 7;
            this._horizontalSpeed = 7;
            switch (this._direction) {
                case objects.EnumDirections.UP:
                    this.velocity = new objects.Vector2(0, this._verticalSpeed);
                    this.position = new objects.Vector2(this.position.x, this.position.y - 10);
                    break;
                case objects.EnumDirections.RIGHT:
                    this.velocity = new objects.Vector2(this._horizontalSpeed, 0);
                    this.position = new objects.Vector2(this.position.x + 10, this.position.y);
                    break;
                case objects.EnumDirections.DOWN:
                    this.velocity = new objects.Vector2(0, this._verticalSpeed);
                    this.position = new objects.Vector2(this.position.x, this.position.y + 10);
                    break;
                case objects.EnumDirections.LEFT:
                    this.velocity = new objects.Vector2(this._horizontalSpeed, 0);
                    this.position = new objects.Vector2(this.position.x - 10, this.position.y);
                    break;
            }
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map