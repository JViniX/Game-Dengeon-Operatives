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
    var Play2 = /** @class */ (function (_super) {
        __extends(Play2, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play2() {
            var _this = _super.call(this) || this;
            _this._enemysAmount = 12;
            _this._sound = createjs.Sound.play("level2");
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // Updates scores labes and statistics.
        Play2.prototype.updateStats = function () {
            this._levelLabel.setText("Level: " + this._level.toString());
            this._lifeLabel.setText("Life: " + config.Game.lifeValue.toString() + "%");
            this._scoreLabel.setText("Score: " + config.Game.scoreValue.toString() + "p");
            this._bulletsLabel.setText("Bullets: " + config.Game.bulletsAmount.toString());
            this._enemiesLabel.setText("Enemies: " + this._enemyShips.length.toString());
            //if the player's life is 0,  eneble reset button.
            if (config.Game.lifeValue <= 0) {
                this._gameOver = true;
                this.addChild(this._gameOverLabel);
                this._gameOverLabel.setText("GAME OVER");
                this._player.gameover();
                this.removeChild(this._player);
                this.addChild(this._resetButton);
            }
            //if there is no enemies, eneble next level button.
            if (this._enemyShips.length == 0) {
                this._gameOver = true;
                this.addChild(this._gameOverLabel);
                this._gameOverLabel.setText("You won this one!\nAre you ready for the next?");
                this.addChild(this._nextButton);
            }
        };
        // PUBLIC METHODS
        //initialize and instatiate
        Play2.prototype.Start = function () {
            this._sound.volume = 0.5;
            this._sound.loop = -1;
            this._resetButton = new objects.Button(config.Game.ASSETS.getResult("resetButton"), config.Game.SCREEN_WIDTH / 2, 550, true);
            this._nextButton = new objects.Button(config.Game.ASSETS.getResult("nextButton"), config.Game.SCREEN_WIDTH / 2, 550, true);
            this._powerStone1 = new objects.Image(config.Game.ASSETS.getResult("stone"), "stone", 500, 100, true);
            this._powerScore1 = new objects.Image(config.Game.ASSETS.getResult("haste-fire"), "power-fire", 500, 100, true);
            this._powerLabel1 = new objects.Label(" ", "24px", "Consolas", "#FFFFFF", 500, 100, true);
            this._powerStone2 = new objects.Image(config.Game.ASSETS.getResult("stone"), "stone", 100, 300, true);
            this._powerScore2 = new objects.Image(config.Game.ASSETS.getResult("haste-fire"), "power-fire", 100, 300, true);
            this._powerLabel2 = new objects.Label(" ", "24px", "Consolas", "#FFFFFF", 100, 300, true);
            this._powerStone3 = new objects.Image(config.Game.ASSETS.getResult("stone"), "stone", 300, 400, true);
            this._powerLife = new objects.Image(config.Game.ASSETS.getResult("haste-sky"), "power-life", 300, 400, true);
            this._powerLabel3 = new objects.Label(" ", "24px", "Consolas", "#FFFFFF", 300, 400, true);
            this._gameOver = false;
            this._gameOverLabel = new objects.Label(" ", "40px", "Consolas", "#FFFFFF", config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2, true);
            this._level = 2;
            this._levelLabel = new objects.Label("Level:", "36px", "Consolas", "#FFFFFF", 20, 20, false);
            this._lifeLabel = new objects.Label("Life:", "36px", "Consolas", "#FFFFFF", 20, 60, false);
            this._scoreLabel = new objects.Label("Score:", "36px", "Consolas", "#FFFFFF", 20, 100, false);
            this._bulletsLabel = new objects.Label("Bullets:", "36px", "Consolas", "#FFFFFF", 20, 140, false);
            this._enemiesLabel = new objects.Label("Enemies:", "36px", "Consolas", "#FFFFFF", 20, 180, false);
            // create the enemyShip array
            this._enemyShips = new Array(); // empty container
            // instantiating enemyShips
            for (var index = 0; index < this._enemysAmount; index++) {
                if (index % 3 == 1)
                    this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip3"), "e" + index, true));
                else
                    this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip"), "e" + index, true));
            }
            // creates the bullets array
            this._bullets = new Array();
            this._arena = new objects.Image(config.Game.ASSETS.getResult("arena2"), "arena2", 0, 0, false);
            if (config.Game.character == 1) {
                this._player = new objects.Player(config.Game.ASSETS.getResult("player"), "player", 600, 400, true);
                this._bulletImage = "bulletBlue";
            }
            else {
                this._player = new objects.Player(config.Game.ASSETS.getResult("player2"), "player", 600, 400, true);
                this._bulletImage = "bullet";
            }
            this._block = new objects.Image(config.Game.ASSETS.getResult("mine"), "block", 400, 800, true);
            this._powerStone4 = new objects.Image(config.Game.ASSETS.getResult("stone"), "stone", 400, 800, true);
            this.Main();
        };
        Play2.prototype.Update = function () {
            this._powerLabel1.Update();
            this._powerLabel2.Update();
            this._powerLabel3.Update();
            this._player.Update();
            managers.Collision.AABBCheck(this._block, this._player);
            managers.Collision.AABBCheck(this._powerStone1, this._player);
            managers.Collision.AABBCheck(this._powerStone2, this._player);
            managers.Collision.AABBCheck(this._powerStone3, this._player);
            managers.Collision.AABBCheck(this._powerStone4, this._player);
            if (managers.Collision.AABBCheck(this._powerScore1, this._player)) {
                var extraBullets1 = this._enemyShips.length + 5;
                this._powerLabel1.setText("+" + extraBullets1.toString() + " bullets");
                this._powerLabel1.Show();
                this._powerLabel1.Disappear();
                config.Game.bulletsAmount = config.Game.bulletsAmount + extraBullets1;
                this._powerScore1.leaveScreen();
                this.removeChild(this._powerScore1);
            }
            if (managers.Collision.AABBCheck(this._powerScore2, this._player)) {
                var extraBullets2 = this._enemyShips.length + 5;
                this._powerLabel2.setText("+" + extraBullets2.toString() + " bullets");
                this._powerLabel2.Show();
                this._powerLabel2.Disappear();
                config.Game.bulletsAmount = config.Game.bulletsAmount + extraBullets2;
                this._powerScore2.leaveScreen();
                this.removeChild(this._powerScore2);
            }
            if (managers.Collision.AABBCheck(this._powerLife, this._player)) {
                this._powerLabel3.setText("+50% Life");
                this._powerLabel3.Show();
                this._powerLabel3.Disappear();
                this._powerLife.leaveScreen();
                this.removeChild(this._powerLife);
                config.Game.lifeValue = config.Game.lifeValue + 50;
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
                    if (managers.Collision.AABBCheck(this._bullets[i], this._powerStone1)) {
                        console.log("================= 1");
                        //removes bullet
                        this.removeChild(this._bullets[i]);
                        this._bullets.splice(i, 1);
                        // removes the stone
                        this._powerStone1.leaveScreen();
                        this.removeChild(this._powerStone1);
                        // sound and score
                        var soundExplosion = createjs.Sound.play("explosion06");
                        soundExplosion.volume = 1.5;
                    }
                    if (managers.Collision.AABBCheck(this._bullets[i], this._powerStone2)) {
                        console.log("================= 2");
                        //removes bullet
                        this.removeChild(this._bullets[i]);
                        this._bullets.splice(i, 1);
                        // removes the stone
                        this._powerStone2.leaveScreen();
                        this.removeChild(this._powerStone2);
                        // sound and score
                        var soundExplosion = createjs.Sound.play("explosion06");
                        soundExplosion.volume = 1.5;
                    }
                    if (managers.Collision.AABBCheck(this._bullets[i], this._powerStone3)) {
                        console.log("================= 3");
                        //removes bullet
                        this.removeChild(this._bullets[i]);
                        this._bullets.splice(i, 1);
                        // removes the stone
                        this._powerStone3.leaveScreen();
                        this.removeChild(this._powerStone3);
                        // sound and score
                        var soundExplosion = createjs.Sound.play("explosion06");
                        soundExplosion.volume = 1.5;
                    }
                    if (managers.Collision.AABBCheck(this._bullets[i], this._powerStone4)) {
                        console.log("================= 4");
                        //removes bullet
                        this.removeChild(this._bullets[i]);
                        this._bullets.splice(i, 1);
                        // removes the stone
                        this._powerStone4.leaveScreen();
                        this.removeChild(this._powerStone4);
                        // sound and score
                        var soundExplosion = createjs.Sound.play("explosion06");
                        soundExplosion.volume = 1.5;
                    }
                    for (var j = 0; j < this._enemyShips.length; j++) {
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
                            config.Game.scoreValue = config.Game.scoreValue + 10;
                        }
                    }
                }
            }
            for (var j = 0; j < this._enemyShips.length; j++) {
                this._enemyShips[j].Update();
                if (managers.Collision.AABBCheck(this._player, this._enemyShips[j])) {
                    createjs.Sound.play("explosion06");
                    config.Game.lifeValue = config.Game.lifeValue - 20;
                    // removes enemy
                    this._enemyShips[j].kill();
                    this.removeChild(this._enemyShips[j]);
                    this._enemyShips.splice(j, 1);
                }
            }
            this.updateStats();
        };
        Play2.prototype.Main = function () {
            var _this = this;
            this.addChild(this._arena);
            this.addChild(this._lifeLabel);
            this.addChild(this._scoreLabel);
            this.addChild(this._bulletsLabel);
            this.addChild(this._levelLabel);
            this.addChild(this._enemiesLabel);
            this.addChild(this._powerScore1);
            this.addChild(this._powerStone1);
            this.addChild(this._powerScore2);
            this.addChild(this._powerStone2);
            this.addChild(this._powerLife);
            this.addChild(this._powerStone3);
            this.addChild(this._powerLabel1);
            this.addChild(this._powerLabel2);
            this.addChild(this._powerLabel3);
            this.addChild(this._player);
            this.addChild(this._block);
            this.addChild(this._powerStone4);
            for (var _i = 0, _a = this._enemyShips; _i < _a.length; _i++) {
                var enemyShip = _a[_i];
                this.addChild(enemyShip);
            }
            window.addEventListener('keydown', function (e) {
                if (!_this._gameOver) {
                    if ((e.keyCode == 17) && (config.Game.bulletsAmount > 0)) // key Ctrl
                     {
                        var bullet = new objects.Bullet(config.Game.ASSETS.getResult(_this._bulletImage), "bullet" + _this._bullets.length, _this._player);
                        _this.addChild(bullet);
                        _this._bullets.push(bullet);
                        config.Game.bulletsAmount = config.Game.bulletsAmount - 1;
                    }
                    else
                        _this._player.Move(e);
                }
            });
            this._resetButton.on("click", function () {
                _this._sound.stop();
                config.Game.SCENE = scenes.State.START;
            });
            this._nextButton.on("click", function () {
                _this._sound.stop();
                config.Game.SCENE = scenes.State.PLAY3;
            });
        };
        return Play2;
    }(objects.Scene));
    scenes.Play2 = Play2;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play2.js.map