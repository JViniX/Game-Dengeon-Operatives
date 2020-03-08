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
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            // create the cloud array
            this._clouds = new Array(); // empty container
            // instantiating CLOUD_NUM clouds
            for (var index = 0; index < 3; index++) {
                this._clouds.push(new objects.Cloud());
            }
            this._bullets = new Array();
            this._arena = new objects.Image(config.Game.ASSETS.getResult("arena"), "arena", 0, 0, false);
            this._player = new objects.Player(config.Game.ASSETS.getResult("player"), "player", 600, 400, true);
            this._block = new objects.Image(config.Game.ASSETS.getResult("placeholder"), "block", 600, 100, true);
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._player.Update();
            managers.Collision.AABBCheck(this._block, this._player);
            this._bullets.forEach(function (bullet) {
                bullet.Update();
                if (bullet.isColliding) {
                    _this.removeChild(bullet);
                    var index = _this._bullets.indexOf(bullet);
                    _this._bullets.splice(index, 0);
                }
            });
            this._clouds.forEach(function (cloud) {
                cloud.Update();
            });
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._arena);
            this.addChild(this._player);
            this.addChild(this._block);
            for (var _i = 0, _a = this._clouds; _i < _a.length; _i++) {
                var cloud = _a[_i];
                this.addChild(cloud);
            }
            window.addEventListener('keydown', function (e) {
                if (e.keyCode == 17) // key Ctrl
                 {
                    var bullet = new objects.Bullet(config.Game.ASSETS.getResult("bulletBlue"), "bullet" + _this._bullets.length, _this._player);
                    _this.addChild(bullet);
                    _this._bullets.push(bullet);
                }
                else
                    _this._player.Move(e);
            });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map