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
        //private _sound = createjs.Sound.play("level1");
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this._enemysAmount = 6;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Play.prototype.updateStats = function () {
            this._levelLabel.setText("Level: " + this._level.toString());
            this._lifeLabel.setText("Life: " + this._lifeValue.toString() + "%");
            this._scoreLabel.setText("Score: " + this._scoreValue.toString() + "p");
            this._bulletsLabel.setText("Bullets: " + this._bulletsAmount.toString());
            this._enemiesLabel.setText("Enemies: " + this._enemyShips.length.toString());
            if (this._lifeValue <= 0) {
                this._gameOver = true;
                this.addChild(this._gameOverLabel);
                this._gameOverLabel.setText("GAME OVER");
                this._player.gameover();
                this.removeChild(this._player);
                this.addChild(this._resetButton);
            }
            if (this._enemyShips.length == 0) {
                this._gameOver = true;
                this.addChild(this._gameOverLabel);
                this._gameOverLabel.setText("You won this one!\nAre you ready for next?");
                this.addChild(this._nextButton);
            }
        };
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            //this.sound = createjs.Sound.play("level1");
            // this._sound.volume = 0.5;
            // this._sound.loop = -1;
            this._resetButton = new objects.Button(config.Game.ASSETS.getResult("resetButton"), config.Game.SCREEN_WIDTH / 2, 550, true);
            this._nextButton = new objects.Button(config.Game.ASSETS.getResult("nextButton"), config.Game.SCREEN_WIDTH / 2, 550, true);
            this._powerScore1 = new objects.Image(config.Game.ASSETS.getResult("haste-fire"), "block", 1000, 100, true);
            this._powerLabel1 = new objects.Label(" ", "24px", "Consolas", "#FFFFFF", 1000, 100, true);
            this._powerScore2 = new objects.Image(config.Game.ASSETS.getResult("haste-fire"), "block", 100, 700, true);
            this._powerLabel2 = new objects.Label(" ", "24px", "Consolas", "#FFFFFF", 100, 700, true);
            this._powerLife = new objects.Image(config.Game.ASSETS.getResult("haste-sky"), "block", 1000, 700, true);
            this._powerLabel3 = new objects.Label("+50%\nLife", "24px", "Consolas", "#FFFFFF", 1000, 700, true);
            this._gameOver = false;
            this._gameOverLabel = new objects.Label(" ", "80px", "Consolas", "#FFFFFF", config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2, true);
            this._level = 1;
            this._levelLabel = new objects.Label("Level:", "36px", "Consolas", "#FFFFFF", 20, 20, false);
            this._lifeValue = 100;
            this._lifeLabel = new objects.Label("Life:", "36px", "Consolas", "#FFFFFF", 20, 60, false);
            this._scoreValue = 0;
            this._scoreLabel = new objects.Label("Score:", "36px", "Consolas", "#FFFFFF", 20, 100, false);
            this._bulletsAmount = 10;
            this._bulletsLabel = new objects.Label("Bullets:", "36px", "Consolas", "#FFFFFF", 20, 140, false);
            this._enemiesLabel = new objects.Label("Enemies:", "36px", "Consolas", "#FFFFFF", 20, 180, false);
            // create the enemyShip array
            this._enemyShips = new Array(); // empty container
            // instantiating enemyShips
            for (var index = 0; index < this._enemysAmount; index++) {
                if (index % 3 == 1)
                    this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip3"), "e" + index));
                else
                    this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip"), "e" + index));
            }
            this._bullets = new Array();
            this._arena = new objects.Image(config.Game.ASSETS.getResult("arena"), "arena", 0, 0, false);
            this._player = new objects.Player(config.Game.ASSETS.getResult("player"), "player", 600, 400, true);
            this._block = new objects.Image(config.Game.ASSETS.getResult("mine"), "block", 600, 100, true);
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._powerLabel1.Update();
            this._powerLabel2.Update();
            this._powerLabel3.Update();
            this._player.Update();
            managers.Collision.AABBCheck(this._block, this._player);
            if (managers.Collision.AABBCheck(this._powerScore1, this._player)) {
                var extraBullets = this._bulletsAmount + this._enemyShips.length + 5;
                this._powerLabel1.setText("+" + extraBullets.toString() + " bullets");
                this.addChild(this._powerLabel1);
                this._powerLabel1.Disappear();
                this._bulletsAmount = extraBullets;
                this._powerScore1.leaveScreen();
                this.removeChild(this._powerScore1);
            }
            if (managers.Collision.AABBCheck(this._powerScore2, this._player)) {
                var extraBullets = this._bulletsAmount + this._enemyShips.length + 5;
                this._powerLabel1.setText("+" + extraBullets.toString() + " bullets");
                this.addChild(this._powerLabel2);
                this._powerLabel2.Disappear();
                this._bulletsAmount = extraBullets;
                this._powerScore2.leaveScreen();
                this.removeChild(this._powerScore2);
            }
            if (managers.Collision.AABBCheck(this._powerLife, this._player)) {
                this.addChild(this._powerLabel3);
                this._powerLife.leaveScreen();
                this.removeChild(this._powerLife);
                this._powerLabel3.Disappear();
                this._lifeValue = this._lifeValue + 50;
            }
            var i;
            for (i = 0; i < this._bullets.length; i++) {
                this._bullets[i].Update();
                if (this._bullets[i].isColliding) {
                    //removes bullet
                    this.removeChild(this._bullets[i]);
                    this._bullets.splice(i, 1);
                }
                else {
                    var j = void 0;
                    for (j = 0; j < this._enemyShips.length; j++) {
                        if (managers.Collision.AABBCheck(this._bullets[i], this._enemyShips[j])) {
                            //removes bullet
                            this.removeChild(this._bullets[i]);
                            this._bullets.splice(i, 1);
                            // removes enemy
                            this._enemyShips[j].kill();
                            this.removeChild(this._enemyShips[j]);
                            this._enemyShips.splice(j, 1);
                            // sound and score
                            var soundExplosion = createjs.Sound.play("explosion06");
                            soundExplosion.volume = 1.5;
                            this._scoreValue = this._scoreValue + 10;
                        }
                    }
                }
            }
            this._enemyShips.forEach(function (enemyShip) {
                enemyShip.Update();
                if (managers.Collision.AABBCheck(_this._player, enemyShip)) {
                    createjs.Sound.play("explosion06");
                    _this._lifeValue = _this._lifeValue - 10;
                }
            });
            this.updateStats();
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._arena);
            this.addChild(this._powerScore1);
            this.addChild(this._powerScore2);
            this.addChild(this._powerLife);
            this.addChild(this._lifeLabel);
            this.addChild(this._scoreLabel);
            this.addChild(this._bulletsLabel);
            this.addChild(this._levelLabel);
            this.addChild(this._enemiesLabel);
            this.addChild(this._player);
            this.addChild(this._block);
            for (var _i = 0, _a = this._enemyShips; _i < _a.length; _i++) {
                var enemyShip = _a[_i];
                this.addChild(enemyShip);
            }
            window.addEventListener('keydown', function (e) {
                if (!_this._gameOver) {
                    if ((e.keyCode == 17) && (_this._bulletsAmount > 0)) // key Ctrl
                     {
                        var bullet = new objects.Bullet(config.Game.ASSETS.getResult("bulletBlue"), "bullet" + _this._bullets.length, _this._player);
                        _this.addChild(bullet);
                        _this._bullets.push(bullet);
                        _this._bulletsAmount = _this._bulletsAmount - 1;
                    }
                    else
                        _this._player.Move(e);
                }
            });
            this._resetButton.on("click", function () {
                //this._sound.stop();
                config.Game.SCENE = scenes.State.START;
            });
            this._nextButton.on("click", function () {
                var randomX = util.Mathf.RandomRange(100, config.Game.SCREEN_WIDTH - 100);
                var randomY = util.Mathf.RandomRange(100, config.Game.SCREEN_HEIGHT - 100);
                _this._powerScore1.showAtScreen(randomX, randomY);
                _this._powerLabel1.showAtScreen(randomX, randomY);
                _this.addChild(_this._powerScore1);
                randomX = util.Mathf.RandomRange(100, config.Game.SCREEN_WIDTH - 100);
                randomY = util.Mathf.RandomRange(100, config.Game.SCREEN_HEIGHT - 100);
                _this._powerScore2.showAtScreen(randomX, randomY);
                _this._powerLabel2.showAtScreen(randomX, randomY);
                _this.addChild(_this._powerScore2);
                randomX = util.Mathf.RandomRange(100, config.Game.SCREEN_WIDTH - 100);
                randomY = util.Mathf.RandomRange(100, config.Game.SCREEN_HEIGHT - 100);
                _this._powerLife.showAtScreen(randomX, randomY);
                _this._powerLabel3.showAtScreen(randomX, randomY);
                _this.addChild(_this._powerLife);
                _this._enemysAmount = _this._enemysAmount + 5;
                for (var index = 0; index < _this._enemysAmount; index++) {
                    if (index % 3 == 1)
                        _this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip3"), "e" + index));
                    else
                        _this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip"), "e" + index));
                }
                for (var _i = 0, _a = _this._enemyShips; _i < _a.length; _i++) {
                    var enemyShip = _a[_i];
                    _this.addChild(enemyShip);
                }
                _this.removeChild(_this._nextButton);
                _this.removeChild(_this._gameOverLabel);
                _this._bulletsAmount = _this._bulletsAmount + _this._enemysAmount;
                _this._level = _this._level + 1;
                _this._gameOver = false;
            });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map