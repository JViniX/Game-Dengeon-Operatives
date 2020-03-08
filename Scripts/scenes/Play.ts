module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _arena: objects.Image;
        private _player: objects.Player;
        private _block: objects.Image;
        private _bullets: Array<objects.Bullet>;
        private _clouds: Array<objects.Cloud>;
        

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
            // create the cloud array
            this._clouds = new Array<objects.Cloud>(); // empty container

            // instantiating CLOUD_NUM clouds
            for (let index = 0; index < 3; index++) {
                this._clouds.push(new objects.Cloud());
            }

            this._bullets = new Array<objects.Bullet>();
            this._arena = new objects.Image(config.Game.ASSETS.getResult("arena"), "arena", 0, 0, false);
            this._player = new objects.Player(config.Game.ASSETS.getResult("player"), "player", 600, 400, true);
            this._block = new objects.Image(config.Game.ASSETS.getResult("placeholder"), "block", 600, 100, true);
            this.Main();
        }        
        
        public Update(): void 
        {
           
            this._player.Update();            
        
            managers.Collision.AABBCheck(this._block, this._player);
                       

            this._bullets.forEach(bullet => {
                bullet.Update();
                if (bullet.isColliding)
                {
                    this.removeChild(bullet);
                    let index = this._bullets.indexOf(bullet);
                    this._bullets.splice(index, 0);
                }
            })

            this._clouds.forEach(cloud => {
                cloud.Update();
            });
        }
      
        
        public Main(): void 
        {
            this.addChild(this._arena);
            this.addChild(this._player);
            this.addChild(this._block);

            for (const cloud of this._clouds) {
                this.addChild(cloud);
            }

            window.addEventListener('keydown', (e)=>
            {
                if(e.keyCode == 17)// key Ctrl
                {
                    let bullet = new objects.Bullet(
                        config.Game.ASSETS.getResult("bulletBlue"), "bullet"+this._bullets.length, this._player);
                    this.addChild(bullet);
                    this._bullets.push(bullet)
                }
                else
                    this._player.Move(e);
            });
        }

        
    }
}