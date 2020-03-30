module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _arena: objects.Image;
        private _player: objects.Player;
        private _block: objects.Image;
        
        private _enemyShips: Array<objects.EnemyShip>;
        
        private _powerLabel1: objects.Label;
        private _powerScore1: objects.Image;

        private _powerLabel2: objects.Label;
        private _powerScore2: objects.Image;

        private _powerLabel3: objects.Label;
        private _powerLife: objects.Image;

        private _scoreLabel: objects.Label;
        private _scoreValue: number;

        private _lifeLabel: objects.Label;
        private _lifeValue: number;

        private _level: number;
        private _levelLabel: objects.Label;

        private _gameOver: boolean;
        private _gameOverLabel: objects.Label;

        private _bullets: Array<objects.Bullet>;
        private _bulletsAmount: number;
        private _bulletsLabel: objects.Label;

        private _resetButton: objects.Button;
        private _nextButton: objects.Button;

        private _enemysAmount: number = 6;
        private _enemiesLabel: objects.Label;
        
        //private _sound = createjs.Sound.play("level1");

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
            this._levelLabel.setText("Level: "+ this._level.toString());
            this._lifeLabel.setText("Life: "+ this._lifeValue.toString()+"%");
            this._scoreLabel.setText("Score: "+ this._scoreValue.toString()+"p");
            this._bulletsLabel.setText("Bullets: "+ this._bulletsAmount.toString());
            this._enemiesLabel.setText("Enemies: "+ this._enemyShips.length.toString());
            if(this._lifeValue <= 0)
            {
                this._gameOver = true;
                this.addChild(this._gameOverLabel);
                this._gameOverLabel.setText("GAME OVER");
                this._player.gameover();
                this.removeChild(this._player);
                this.addChild(this._resetButton);
            }
            if(this._enemyShips.length == 0)
            {
                this._gameOver = true;
                this.addChild(this._gameOverLabel);
                this._gameOverLabel.setText("You won this one!\nAre you ready for next?");
                this.addChild(this._nextButton);
            }
        }

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            //this.sound = createjs.Sound.play("level1");
            // this._sound.volume = 0.5;
            // this._sound.loop = -1;
            
            this._resetButton = new objects.Button(config.Game.ASSETS.getResult("resetButton"), config.Game.SCREEN_WIDTH/2, 550, true);
            this._nextButton = new objects.Button(config.Game.ASSETS.getResult("nextButton"), config.Game.SCREEN_WIDTH/2, 550, true);
            
            this._powerScore1 = new objects.Image(config.Game.ASSETS.getResult("haste-fire"), "block", 1000, 100, true);
            this._powerLabel1 = new objects.Label(" ", "24px", "Consolas", "#FFFFFF", 1000, 100, true);

            this._powerScore2 = new objects.Image(config.Game.ASSETS.getResult("haste-fire"), "block", 100, 700, true);
            this._powerLabel2 = new objects.Label(" ", "24px", "Consolas", "#FFFFFF", 100, 700, true);

            this._powerLife = new objects.Image(config.Game.ASSETS.getResult("haste-sky"), "block", 1000, 700, true);
            this._powerLabel3 = new objects.Label("+50%\nLife", "24px", "Consolas", "#FFFFFF", 1000, 700, true);

            this._gameOver = false;
            this._gameOverLabel = new objects.Label(" ", "80px", "Consolas", "#FFFFFF", config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT/2, true);

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
            this._enemyShips = new Array<objects.EnemyShip>(); // empty container

            // instantiating enemyShips
            for (let index = 0; index < this._enemysAmount; index++) {
                if(index % 3 == 1) this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip3"), "e"+index));
                else this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip"), "e"+index));
            }

            this._bullets = new Array<objects.Bullet>();
            this._arena = new objects.Image(config.Game.ASSETS.getResult("arena"), "arena", 0, 0, false);
            this._player = new objects.Player(config.Game.ASSETS.getResult("player"), "player", 600, 400, true);
            this._block = new objects.Image(config.Game.ASSETS.getResult("mine"), "block", 600, 100, true);
            
            this.Main();
        }        
        
        public Update(): void 
        {
            this._powerLabel1.Update();
            this._powerLabel2.Update();
            this._powerLabel3.Update();
            this._player.Update();            
        
            managers.Collision.AABBCheck(this._block, this._player);

            if(managers.Collision.AABBCheck(this._powerScore1, this._player))
            {
                let extraBullets = this._bulletsAmount + this._enemyShips.length + 5;
                this._powerLabel1.setText("+"+extraBullets.toString()+" bullets");
                this.addChild(this._powerLabel1);
                this._powerLabel1.Disappear();
                this._bulletsAmount = extraBullets;

                this._powerScore1.leaveScreen();
                this.removeChild(this._powerScore1);
            }

            if(managers.Collision.AABBCheck(this._powerScore2, this._player))
            {
                let extraBullets = this._bulletsAmount + this._enemyShips.length + 5;
                this._powerLabel1.setText("+"+extraBullets.toString()+" bullets");
                this.addChild(this._powerLabel2);
                this._powerLabel2.Disappear();
                this._bulletsAmount = extraBullets;

                this._powerScore2.leaveScreen();
                this.removeChild(this._powerScore2);
            }

            if(managers.Collision.AABBCheck(this._powerLife, this._player))
            {
                this.addChild(this._powerLabel3);
                this._powerLife.leaveScreen();
                this.removeChild(this._powerLife);
                this._powerLabel3.Disappear();
                this._lifeValue = this._lifeValue + 50;
            }
                       
            let i;
            for(i = 0; i < this._bullets.length; i++)
            {
                this._bullets[i].Update();
                if (this._bullets[i].isColliding)
                {
                    //removes bullet
                    this.removeChild(this._bullets[i]);
                    this._bullets.splice(i, 1);
                }
                else
                {
                    let j;
                    for(j = 0; j < this._enemyShips.length; j++)
                    {
                        if(managers.Collision.AABBCheck(this._bullets[i], this._enemyShips[j]))
                        {
                            //removes bullet
                            this.removeChild(this._bullets[i]);
                            this._bullets.splice(i, 1);

                            // removes enemy
                            this._enemyShips[j].kill();
                            this.removeChild(this._enemyShips[j]);
                            this._enemyShips.splice(j, 1);

                            
                            // sound and score
                            let soundExplosion = createjs.Sound.play("explosion06");
                            soundExplosion.volume = 1.5;
                            this._scoreValue = this._scoreValue + 10;
                        }
                    } 
                }               
            }
            
            this._enemyShips.forEach(enemyShip => {
                enemyShip.Update();
                if(managers.Collision.AABBCheck(this._player, enemyShip))
                {
                    createjs.Sound.play("explosion06");
                    this._lifeValue = this._lifeValue - 10;                            
                }
            });

            this.updateStats();
        }
      
        
        public Main(): void 
        {
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

            for (const enemyShip of this._enemyShips) {
                this.addChild(enemyShip);
            }
            
            window.addEventListener('keydown', (e)=>
            {
                if(!this._gameOver)
                {
                    if((e.keyCode == 17) && (this._bulletsAmount > 0))// key Ctrl
                    {
                        let bullet = new objects.Bullet(
                            config.Game.ASSETS.getResult("bulletBlue"), "bullet"+this._bullets.length, this._player);
                        this.addChild(bullet);
                        this._bullets.push(bullet)
                        this._bulletsAmount = this._bulletsAmount - 1;
                    }
                    else
                        this._player.Move(e);
                }
            });

            this._resetButton.on("click", ()=>{
                //this._sound.stop();
                config.Game.SCENE = scenes.State.START;
            });

            this._nextButton.on("click", ()=>{
                
                let randomX = util.Mathf.RandomRange(100, config.Game.SCREEN_WIDTH - 100);
                let randomY = util.Mathf.RandomRange(100, config.Game.SCREEN_HEIGHT - 100);
                this._powerScore1.showAtScreen(randomX, randomY);
                this._powerLabel1.showAtScreen(randomX, randomY);
                this.addChild(this._powerScore1);

                randomX = util.Mathf.RandomRange(100, config.Game.SCREEN_WIDTH - 100);
                randomY = util.Mathf.RandomRange(100, config.Game.SCREEN_HEIGHT - 100);
                this._powerScore2.showAtScreen(randomX, randomY);
                this._powerLabel2.showAtScreen(randomX, randomY);
                this.addChild(this._powerScore2);

                randomX = util.Mathf.RandomRange(100, config.Game.SCREEN_WIDTH - 100);
                randomY = util.Mathf.RandomRange(100, config.Game.SCREEN_HEIGHT - 100);
                this._powerLife.showAtScreen(randomX, randomY);
                this._powerLabel3.showAtScreen(randomX, randomY);
                this.addChild(this._powerLife);

                this._enemysAmount = this._enemysAmount + 5;
                for (let index = 0; index < this._enemysAmount; index++) {
                    if(index % 3 == 1) this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip3"), "e"+index));
                    else this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip"), "e"+index));
                }
                for (const enemyShip of this._enemyShips) {
                    this.addChild(enemyShip);
                }
                this.removeChild(this._nextButton);
                this.removeChild(this._gameOverLabel);

                this._bulletsAmount = this._bulletsAmount + this._enemysAmount;
                this._level = this._level + 1;

                this._gameOver = false;
            });
        }

        
    }
}