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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            //instantiate a new Text object
            this._back = new objects.Image(config.Game.ASSETS.getResult("black"), "back", 1224 / 2, 300, true);
            this._back.scaleX = config.Game.SCREEN_WIDTH;
            this._back.scaleY = config.Game.SCREEN_HEIGHT;
            this._logo = new objects.Image(config.Game.ASSETS.getResult("logo"), "logo", 1224 / 2, 200, true);
            this._welcomeLabel = new objects.Label("Welcome to Dengeon Operatives", "40px", "Arial Black", "#FFFFFF", 1224 / 2, 400, true);
            this._info1Label = new objects.Label("Select your player to start", "30px", "Consolas", "#FFFFFF", 1224 / 2, 500, true);
            this._info2Label = new objects.Label("Use arrows to move and Ctrl to shoot", "25px", "Consolas", "#FFFFFF", 1224 / 2, 700, true);
            // buttons
            this._startButton = new objects.Button(config.Game.ASSETS.getResult("player"), 1224 / 2 - 50, 600, true);
            this._startButton2 = new objects.Button(config.Game.ASSETS.getResult("player2"), 1224 / 2 + 50, 600, true);
            this.Main();
        };
        Start.prototype.Update = function () {
        };
        Start.prototype.Main = function () {
            this.addChild(this._back);
            this.addChild(this._welcomeLabel);
            this.addChild(this._info1Label);
            this.addChild(this._info2Label);
            this.addChild(this._logo);
            this.addChild(this._startButton);
            this.addChild(this._startButton2);
            this._startButton.on("click", function () {
                config.Game.character = 1;
                config.Game.SCENE = scenes.State.PLAY;
            });
            this._startButton2.on("click", function () {
                config.Game.character = 2;
                config.Game.SCENE = scenes.State.PLAY;
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map