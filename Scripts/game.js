"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var assets;
    var assetManifest = [
        { id: "button", src: "./Assets/images/button.png" },
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "arena", src: "./Assets/images/arena.jpg" },
        { id: "arena2", src: "./Assets/images/arena2.jpeg" },
        { id: "arena3", src: "./Assets/images/arena3.jpeg" },
        { id: "player", src: "./Assets/images/player.png" },
        { id: "player2", src: "./Assets/images/player2nd.png" },
        { id: "bulletBlue", src: "./Assets/images/bulletBlue.png" },
        { id: "bullet", src: "./Assets/images/bullet.png" },
        { id: "mine", src: "./Assets/images/mine.png" },
        { id: "enemyShip", src: "./Assets/images/enemyShip.png" },
        { id: "enemyShip3", src: "./Assets/images/ship3.png" },
        { id: "haste-fire", src: "./Assets/images/haste-fire.png" },
        { id: "haste-sky", src: "./Assets/images/haste-sky.png" },
        { id: "logo", src: "./Assets/images/brainus.jpg" },
        { id: "black", src: "./Assets/images/black.png" },
        { id: "stone", src: "./Assets/images/Stone.png" },
        { id: "bossvehicle", src: "./Assets/images/Boss-vehicle.png" },
        { id: "laser1", src: "./Assets/audio/laser1.wav" },
        { id: "explosion06", src: "./Assets/audio/explosion06.wav" },
        { id: "level1", src: "./Assets/audio/level1.ogg" },
        { id: "level2", src: "./Assets/audio/level2.ogg" },
        { id: "level3", src: "./Assets/audio/level3.ogg" }
    ];
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log("%c Scene Switched...", "color: green; font-size: 16px;");
        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }
        // switch to the new scene
        switch (config.Game.SCENE) {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene 1");
                currentScene = new scenes.Play();
                break;
            case scenes.State.PLAY2:
                console.log("switch to Play Scene 2");
                currentScene = new scenes.Play2();
                break;
            case scenes.State.PLAY3:
                console.log("switch to Play Scene 3");
                currentScene = new scenes.Play3();
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End();
                break;
        }
        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map