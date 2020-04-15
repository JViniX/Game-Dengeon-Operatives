module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _startButton: objects.Button;
        private _startButton2: objects.Button;
        private _logo: objects.Image;
        private _back: objects.Image;

        private _info1Label: objects.Label;
        private _info2Label: objects.Label;
     

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void 
        {
            //instantiate a new Text object
            this._back = new objects.Image(config.Game.ASSETS.getResult("black"), "back", 1224/2, 300, true);
            this._back.scaleX = config.Game.SCREEN_WIDTH;
            this._back.scaleY = config.Game.SCREEN_HEIGHT;

            this._logo = new objects.Image(config.Game.ASSETS.getResult("logo"), "logo", 1224/2, 200, true);
            this._welcomeLabel = new objects.Label("Welcome to Dengeon Operatives", "40px", "Arial Black", "#FFFFFF", 1224/2, 400, true);
            this._info1Label = new objects.Label("Select your player to start", "30px", "Consolas", "#FFFFFF", 1224/2, 500, true);
            this._info2Label = new objects.Label("Use arrows to move and Ctrl to shoot", "25px", "Consolas", "#FFFFFF", 1224/2, 700, true);

            // buttons
           this._startButton = new objects.Button(config.Game.ASSETS.getResult("player"), 1224/2-50, 600, true);
           this._startButton2 = new objects.Button(config.Game.ASSETS.getResult("player2"), 1224/2+50, 600, true);

            this.Main();
        }        
        
        public Update(): void 
        {

        }
        
        public Main(): void 
        {
            this.addChild(this._back);
       
            this.addChild(this._welcomeLabel);
            this.addChild(this._info1Label);
            this.addChild(this._info2Label);
            this.addChild(this._logo);
       
            this.addChild(this._startButton);
            this.addChild(this._startButton2);

            this._startButton.on("click", ()=>{
                config.Game.character = 1;
                config.Game.SCENE = scenes.State.PLAY;
            });

            this._startButton2.on("click", ()=>{
                config.Game.character = 2;
                config.Game.SCENE = scenes.State.PLAY;
            });
        }
    }
}