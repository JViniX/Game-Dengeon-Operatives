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
    var EnemyShip = /** @class */ (function (_super) {
        __extends(EnemyShip, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function EnemyShip(imagePath, name, randomPosittion) {
            var _this = _super.call(this, imagePath, 0, 0, true) || this;
            _this._isRandomDirection = false;
            _this.name = name;
            _this._isRandomDirection = randomPosittion;
            _this._direction = Math.floor(util.Mathf.RandomRange(objects.EnumDirections.UP, objects.EnumDirections.LEFT));
            // this._direction = objects.EnumDirections.DOWN.valueOf();
            switch (_this._direction) {
                case objects.EnumDirections.DOWN:
                    _this.position = new objects.Vector2(config.Game.SCREEN_WIDTH / 2, 0 - _this.height);
                    _this.rotation = 180;
                    break;
                case objects.EnumDirections.LEFT:
                    _this.position = new objects.Vector2(config.Game.SCREEN_WIDTH + _this.width, config.Game.SCREEN_HEIGHT / 2);
                    _this.rotation = -90;
                    break;
                case objects.EnumDirections.UP:
                    _this.position = new objects.Vector2(config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT + _this.height);
                    _this.rotation = 0;
                    break;
                case objects.EnumDirections.RIGHT:
                    _this.position = new objects.Vector2(0 - _this.width, config.Game.SCREEN_HEIGHT / 2);
                    _this.rotation = 90;
                    break;
            }
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        EnemyShip.prototype._checkBounds = function () {
            if ((this.position.y >= config.Game.SCREEN_HEIGHT + (this.height * 2)) ||
                (this.position.y <= 0 - (this.height * 2)) ||
                (this.position.x >= config.Game.SCREEN_WIDTH + (this.width * 2) ||
                    (this.position.x <= 0 - (this.width * 2)))) {
                this.Reset();
            }
        };
        EnemyShip.prototype._move = function () {
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
        // when it's dead, moves to outside the canvas.
        EnemyShip.prototype.kill = function () {
            this._isDead = true;
            this.position.x = -200;
            this.position.y = -200;
        };
        EnemyShip.prototype.Start = function () {
            this.Reset();
        };
        EnemyShip.prototype.Update = function () {
            if (!this._isDead) {
                this._move();
                this._checkBounds();
            }
        };
        EnemyShip.prototype.Reset = function () {
            this.isColliding = false;
            this._verticalSpeed = util.Mathf.RandomRange(2, 5);
            this._horizontalSpeed = util.Mathf.RandomRange(2, 5);
            // defines new direction.
            var newDirection = 0;
            if (this._isRandomDirection) {
                newDirection = Math.floor(util.Mathf.RandomRange(objects.EnumDirections.UP, objects.EnumDirections.LEFT));
            }
            else { //if randomDirection is false, it just reverses de direction.
                if (this._direction == objects.EnumDirections.UP)
                    newDirection = objects.EnumDirections.DOWN;
                if (this._direction == objects.EnumDirections.DOWN)
                    newDirection = objects.EnumDirections.UP;
                if (this._direction == objects.EnumDirections.LEFT)
                    newDirection = objects.EnumDirections.RIGHT;
                if (this._direction == objects.EnumDirections.RIGHT)
                    newDirection = objects.EnumDirections.LEFT;
            }
            // adjusts the bounds.
            if (this._direction != newDirection) {
                this._direction = newDirection;
                var aux = this.height;
                this.height = this.width;
                this.width = aux;
            }
            // sets the position accordingly.
            var randomX = util.Mathf.RandomRange(0, config.Game.SCREEN_WIDTH);
            var randomY = util.Mathf.RandomRange(0, config.Game.SCREEN_HEIGHT);
            switch (this._direction) {
                case objects.EnumDirections.UP:
                    this.velocity = new objects.Vector2(0, this._verticalSpeed);
                    this.position = new objects.Vector2(randomX, config.Game.SCREEN_HEIGHT + this.height);
                    this.rotation = 0;
                    break;
                case objects.EnumDirections.RIGHT:
                    this.velocity = new objects.Vector2(this._horizontalSpeed, 0);
                    this.position = new objects.Vector2(0, randomY);
                    this.rotation = 90;
                    break;
                case objects.EnumDirections.DOWN:
                    this.velocity = new objects.Vector2(0, this._verticalSpeed);
                    this.position = new objects.Vector2(randomX, -this.height);
                    this.rotation = 180;
                    break;
                case objects.EnumDirections.LEFT:
                    this.velocity = new objects.Vector2(this._horizontalSpeed, 0);
                    this.position = new objects.Vector2(config.Game.SCREEN_WIDTH, randomY);
                    this.rotation = -90;
                    break;
            }
        };
        return EnemyShip;
    }(objects.GameObject));
    objects.EnemyShip = EnemyShip;
})(objects || (objects = {}));
//# sourceMappingURL=EnemyShip.js.map