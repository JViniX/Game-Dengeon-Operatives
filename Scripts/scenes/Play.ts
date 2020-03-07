module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _arena: objects.Image;
        private _player: objects.Player;
        private _block: objects.Image;
        

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
            this._arena = new objects.Image(config.Game.ASSETS.getResult("arena"), "arena", 0, 0, false);
            this._player = new objects.Player(config.Game.ASSETS.getResult("player"), "player", 600, 400, true);
            this._block = new objects.Image();
             this.Main();
        }        
        
        public Update(): void 
        {
            if(managers.Collision.AABBCheck(this._block, this._player))
            {
                console.log("Colision");
            }
        }
      
        
        public Main(): void 
        {
            this.addChild(this._arena);
            this.addChild(this._player);
            this.addChild(this._block);

            window.addEventListener('keydown', (e)=>
            {
                this._player.Move(e);
            });
        }

        
    }
}