module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _startButton: objects.Button;
        private _logo: objects.Image;
        private _back: objects.Image;
     

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

            this._logo = new objects.Image(config.Game.ASSETS.getResult("logo"), "logo", 1224/2, 300, true);
            this._welcomeLabel = new objects.Label("Welcome to Dengeon Operatives", "40px", "Consolas", "#FFFFFF", 1224/2, 520, true);

            // buttons
           this._startButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 1224/2, 600, true);

            this.Main();
        }        
        
        public Update(): void 
        {

        }
        
        public Main(): void 
        {
            this.addChild(this._back);
       
            this.addChild(this._welcomeLabel);
            this.addChild(this._logo);
       
            this.addChild(this._startButton);

            this._startButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
            });
        }
    }
}