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
            _this._sound = createjs.Sound.play("level1");
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Play.prototype.updateStats = function () {
            this._lifeLabel.setText("Life: " + this._lifeValue.toString());
            this._scoreLabel.setText("Score: " + this._scoreValue.toString());
            if (this._lifeValue <= 0) {
                this._gameOver = true;
                this._gameOverLabel.setText("GAME OVER");
                this.removeChild(this._player);
                this.addChild(this._resetButton);
            }
        };
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            //this.sound = createjs.Sound.play("level1");
            this._sound.volume = 0.5;
            this._sound.loop = -1;
            this._resetButton = new objects.Button(config.Game.ASSETS.getResult("resetButton"), config.Game.SCREEN_WIDTH / 2, 550, true);
            //createjs.Sound.play("level1");
            this._gameOver = false;
            this._gameOverLabel = new objects.Label(" ", "120px", "Consolas", "#FFFFFF", config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2, true);
            this._lifeValue = 100;
            this._lifeLabel = new objects.Label("Life:", "36px", "Consolas", "#FFFFFF", 20, 20, false);
            this._scoreValue = 0;
            this._scoreLabel = new objects.Label("Score:", "36px", "Consolas", "#FFFFFF", 20, 50, false);
            // create the enemyShip array
            this._enemyShips = new Array(); // empty container
            // instantiating enemyShips
            for (var index = 0; index < 10; index++) {
                this._enemyShips.push(new objects.EnemyShip());
            }
            this._bullets = new Array();
            this._arena = new objects.Image(config.Game.ASSETS.getResult("arena"), "arena", 0, 0, false);
            this._player = new objects.Player(config.Game.ASSETS.getResult("player"), "player", 600, 400, true);
            this._block = new objects.Image(config.Game.ASSETS.getResult("mine"), "block", 600, 100, true);
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
                else {
                    _this._enemyShips.forEach(function (enemyShip) {
                        if (managers.Collision.AABBCheck(bullet, enemyShip)) {
                            _this.removeChild(enemyShip);
                            var indexEnemy = _this._enemyShips.indexOf(enemyShip);
                            _this._enemyShips.splice(indexEnemy, 0);
                            var soundExplosion = createjs.Sound.play("explosion06");
                            soundExplosion.volume = 1.5;
                            _this._scoreValue = _this._scoreValue + 10;
                        }
                    });
                }
            });
            this._enemyShips.forEach(function (enemyShip) {
                enemyShip.Update();
                if (managers.Collision.AABBCheck(_this._player, enemyShip)) {
                    createjs.Sound.play("explosion06");
                    _this._lifeValue = _this._lifeValue - 20;
                }
            });
            this.updateStats();
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._arena);
            this.addChild(this._lifeLabel);
            this.addChild(this._scoreLabel);
            this.addChild(this._player);
            this.addChild(this._block);
            for (var _i = 0, _a = this._enemyShips; _i < _a.length; _i++) {
                var enemyShip = _a[_i];
                this.addChild(enemyShip);
            }
            this.addChild(this._gameOverLabel);
            window.addEventListener('keydown', function (e) {
                if ((!_this._gameOver) && (e.keyCode == 17)) // key Ctrl
                 {
                    var bullet = new objects.Bullet(config.Game.ASSETS.getResult("bulletBlue"), "bullet" + _this._bullets.length, _this._player);
                    _this.addChild(bullet);
                    _this._bullets.push(bullet);
                }
                else
                    _this._player.Move(e);
            });
            this._resetButton.on("click", function () {
                _this._sound.stop();
                config.Game.SCENE = scenes.State.START;
            });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map