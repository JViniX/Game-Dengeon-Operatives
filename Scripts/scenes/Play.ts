module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _arena: objects.Image;
        private _player: objects.Player;
        private _block: objects.Image;
        private _bullets: Array<objects.Bullet>;
        private _enemyShips: Array<objects.EnemyShip>;

        private _scoreLabel: objects.Label;
        private _scoreValue: number;

        private _lifeLabel: objects.Label;
        private _lifeValue: number;

        private _gameOver: boolean;
        private _gameOverLabel: objects.Label;

        private _resetButton: objects.Button;
        
        private _sound = createjs.Sound.play("level1");

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS
        private updateStats(): void
        {
            this._lifeLabel.setText("Life: "+ this._lifeValue.toString());
            this._scoreLabel.setText("Score: "+ this._scoreValue.toString());
            if(this._lifeValue <= 0)
            {
                this._gameOver = true;
                this._gameOverLabel.setText("GAME OVER");
                this.removeChild(this._player);
                this.addChild(this._resetButton);
            }
        }

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            //this.sound = createjs.Sound.play("level1");
            this._sound.volume = 0.5;
            this._sound.loop = -1;

            this._resetButton = new objects.Button(config.Game.ASSETS.getResult("resetButton"), config.Game.SCREEN_WIDTH/2, 550, true);
            //createjs.Sound.play("level1");
            this._gameOver = false;
            this._gameOverLabel = new objects.Label(" ", "120px", "Consolas", "#FFFFFF", config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT/2, true);

            this._lifeValue = 100;
            this._lifeLabel = new objects.Label("Life:", "36px", "Consolas", "#FFFFFF", 20, 20, false);

            this._scoreValue = 0;
            this._scoreLabel = new objects.Label("Score:", "36px", "Consolas", "#FFFFFF", 20, 50, false);
            // create the enemyShip array
            this._enemyShips = new Array<objects.EnemyShip>(); // empty container

            // instantiating enemyShips
            for (let index = 0; index < 10; index++) {
                this._enemyShips.push(new objects.EnemyShip());

            }

            this._bullets = new Array<objects.Bullet>();
            this._arena = new objects.Image(config.Game.ASSETS.getResult("arena"), "arena", 0, 0, false);
            this._player = new objects.Player(config.Game.ASSETS.getResult("player"), "player", 600, 400, true);
            this._block = new objects.Image(config.Game.ASSETS.getResult("mine"), "block", 600, 100, true);
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
                else{
                    this._enemyShips.forEach(enemyShip => {
                        if(managers.Collision.AABBCheck(bullet, enemyShip))
                        {
                            this.removeChild(enemyShip);
                            let indexEnemy = this._enemyShips.indexOf(enemyShip);
                            this._enemyShips.splice(indexEnemy, 0);
                            let soundExplosion = createjs.Sound.play("explosion06");
                            soundExplosion.volume = 1.5;
                            this._scoreValue = this._scoreValue + 10;                            
                        }
                    });
                    
                }
            })

            this._enemyShips.forEach(enemyShip => {
                enemyShip.Update();
                if(managers.Collision.AABBCheck(this._player, enemyShip))
                {
                    createjs.Sound.play("explosion06");
                    this._lifeValue = this._lifeValue - 20;                            
                }
            });

            this.updateStats();
        }
      
        
        public Main(): void 
        {
            this.addChild(this._arena);
            this.addChild(this._lifeLabel);
            this.addChild(this._scoreLabel);
            this.addChild(this._player);
            this.addChild(this._block);

            for (const enemyShip of this._enemyShips) {
                this.addChild(enemyShip);
            }

            this.addChild(this._gameOverLabel);

            window.addEventListener('keydown', (e)=>
            {
                if((!this._gameOver) &&(e.keyCode == 17))// key Ctrl
                {
                    let bullet = new objects.Bullet(
                        config.Game.ASSETS.getResult("bulletBlue"), "bullet"+this._bullets.length, this._player);
                    this.addChild(bullet);
                    this._bullets.push(bullet)
                }
                else
                    this._player.Move(e);
            });

            this._resetButton.on("click", ()=>{
                this._sound.stop();
                config.Game.SCENE = scenes.State.START;
            });
        }

        
    }
}