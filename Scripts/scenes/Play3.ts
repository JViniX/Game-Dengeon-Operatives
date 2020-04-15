module scenes
{
    export class Play3 extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _arena: objects.Image;
        private _player: objects.Player;
        private _block: objects.Image;
        private _powerStone4: objects.Image;

        private _bulletImage: string;

        private _enemyShips: Array<objects.EnemyShip>;
        private _enemyBoss: objects.EnemyShip;
        private _enemyBossLife: number;
        private _lifeBossLabel: objects.Label;
        private _enemysAmount: number = 12;
        private _enemiesLabel: objects.Label;
        
        private _powerLabel1: objects.Label;
        private _powerScore1: objects.Image;
        private _powerStone1: objects.Image;

        private _powerLabel2: objects.Label;
        private _powerScore2: objects.Image;
        private _powerStone2: objects.Image;

        private _powerLabel3: objects.Label;
        private _powerLife: objects.Image;
        private _powerStone3: objects.Image;

        private _scoreLabel: objects.Label;
        private _lifeLabel: objects.Label;

        private _level: number;
        private _levelLabel: objects.Label;

        private _gameOver: boolean;
        private _gameOverLabel: objects.Label;

        private _bullets: Array<objects.Bullet>;
        private _bulletsLabel: objects.Label;

        private _resetButton: objects.Button;
        
        private _sound = createjs.Sound.play("level3");

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // Updates scores labes and statistics.
        private updateStats(): void
        {
            this._levelLabel.setText("Level: "+ this._level.toString());
            this._lifeLabel.setText("Life: "+ config.Game.lifeValue.toString()+"%");
            this._lifeBossLabel.setText("Boss: "+ this._enemyBossLife.toString()+"%");
            this._scoreLabel.setText("Score: "+ config.Game.scoreValue.toString()+"p");
            this._bulletsLabel.setText("Bullets: "+ config.Game.bulletsAmount.toString());
            this._enemiesLabel.setText("Enemies: "+ this._enemyShips.length.toString());


            //if the player's life is 0,  eneble reset button.
            if(config.Game.lifeValue <= 0)
            {
                this._gameOver = true;
                this.addChild(this._gameOverLabel);
                this._gameOverLabel.setText("GAME OVER");
                this._player.gameover();
                this.removeChild(this._player);
                this.addChild(this._resetButton);
            }

            //if there is no enemies, eneble next level button.
            if(this._enemyShips.length == 0 && this._enemyBossLife == 0)
            {
                this._gameOver = true;
                this.addChild(this._gameOverLabel);
                this._gameOverLabel.setText("You win!\nCongratulations!!!");
                this.addChild(this._resetButton);
            }
        }

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            this._sound.volume = 0.5;
            this._sound.loop = -1;
            
            this._resetButton = new objects.Button(config.Game.ASSETS.getResult("resetButton"), config.Game.SCREEN_WIDTH/2, 550, true);
            
            this._powerStone1 = new objects.Image(config.Game.ASSETS.getResult("stone"), "stone", 900, 100, true);
            this._powerScore1 = new objects.Image(config.Game.ASSETS.getResult("haste-fire"), "power-fire", 900, 100, true);
            this._powerLabel1 = new objects.Label(" ", "24px", "Consolas", "#FFFFFF", 900, 100, true);

            this._powerStone2 = new objects.Image(config.Game.ASSETS.getResult("stone"), "stone", 100, 300, true);
            this._powerScore2 = new objects.Image(config.Game.ASSETS.getResult("haste-fire"), "power-fire", 100, 300, true);
            this._powerLabel2 = new objects.Label(" ", "24px", "Consolas", "#FFFFFF", 100, 300, true);

            this._powerStone3 = new objects.Image(config.Game.ASSETS.getResult("stone"), "stone", 300, 400, true);
            this._powerLife = new objects.Image(config.Game.ASSETS.getResult("haste-sky"), "power-life", 300, 400, true);
            this._powerLabel3 = new objects.Label(" ", "24px", "Consolas", "#FFFFFF", 300, 400, true);

            this._gameOver = false;
            this._gameOverLabel = new objects.Label(" ", "40px", "Consolas", "#FFFFFF", config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT/2, true);
            
            config.Game.bulletsAmount += 5; // gives extra bullets to the player
            this._enemyBossLife = 100; // defines boss life
            this._level = 3;
            this._levelLabel = new objects.Label("Level:", "36px", "Consolas", "#FFFFFF", 20, 20, false);

            this._lifeLabel = new objects.Label("Life:", "36px", "Consolas", "#FFFFFF", 20, 60, false);
            this._lifeBossLabel = new objects.Label("Boss:", "36px", "Consolas", "#FFFFFF", 1000, 20, false);
            this._scoreLabel = new objects.Label("Score:", "36px", "Consolas", "#FFFFFF", 20, 100, false);
            this._bulletsLabel = new objects.Label("Bullets:", "36px", "Consolas", "#FFFFFF", 20, 140, false);

            this._enemiesLabel = new objects.Label("Enemies:", "36px", "Consolas", "#FFFFFF", 20, 180, false);
            
            // create the enemyShip array
            this._enemyShips = new Array<objects.EnemyShip>(); // empty container

            this._enemyBoss = new objects.EnemyShip(config.Game.ASSETS.getResult("bossvehicle"), "enemyBoss", true);
            // instantiating enemyShips
            for (let index = 0; index < this._enemysAmount; index++) {
                if(index % 3 == 1) this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip3"), "e"+index, true));
                else this._enemyShips.push(new objects.EnemyShip(config.Game.ASSETS.getResult("enemyShip"), "e"+index, true));
            }

            // creates the bullets array
            this._bullets = new Array<objects.Bullet>();
            this._arena = new objects.Image(config.Game.ASSETS.getResult("arena3"), "arena3", 0, 0, false);

            // changes player and bullet image based on player selection
            if(config.Game.character == 1)
            {
                this._player = new objects.Player(config.Game.ASSETS.getResult("player"), "player", 600, 400, true);
                this._bulletImage = "bulletBlue";
            }
            else{
                this._player = new objects.Player(config.Game.ASSETS.getResult("player2"), "player", 600, 400, true);
                this._bulletImage = "bullet";
            }

            this._block = new objects.Image(config.Game.ASSETS.getResult("mine"), "block", 400, 400, true);
            this._powerStone4 = new objects.Image(config.Game.ASSETS.getResult("stone"), "stone", 400, 400, true);
            
            this.Main();
        }        
        
        public Update(): void 
        {
            this._powerLabel1.Update();
            this._powerLabel2.Update();
            this._powerLabel3.Update();
            this._player.Update();          
            this._enemyBoss.Update();  
        
            // blocks the player to transpass these objects.
            managers.Collision.AABBCheck(this._block, this._player);
            managers.Collision.AABBCheck(this._powerStone1, this._player);
            managers.Collision.AABBCheck(this._powerStone2, this._player);
            managers.Collision.AABBCheck(this._powerStone3, this._player);
            managers.Collision.AABBCheck(this._powerStone4, this._player);

            // player gets the power-up bullets
            if(managers.Collision.AABBCheck(this._powerScore1, this._player))
            {
                let extraBullets1 = this._enemyShips.length + 5;
                this._powerLabel1.setText("+"+extraBullets1.toString()+" bullets");
                this._powerLabel1.Show();
                this._powerLabel1.Disappear();
                config.Game.bulletsAmount = config.Game.bulletsAmount + extraBullets1;

                this._powerScore1.leaveScreen();
                this.removeChild(this._powerScore1);
            }

            // player gets the power-up bullets
            if(managers.Collision.AABBCheck(this._powerScore2, this._player))
            {
                let extraBullets2 = this._enemyShips.length + 5;
                this._powerLabel2.setText("+"+extraBullets2.toString()+" bullets");
                this._powerLabel2.Show();
                this._powerLabel2.Disappear();
                config.Game.bulletsAmount = config.Game.bulletsAmount + extraBullets2;

                this._powerScore2.leaveScreen();
                this.removeChild(this._powerScore2);
            }

            // player gets the power-up life
            if(managers.Collision.AABBCheck(this._powerLife, this._player))
            {
                this._powerLabel3.setText("+50% Life");
                this._powerLabel3.Show();
                this._powerLabel3.Disappear();
                this._powerLife.leaveScreen();
                this.removeChild(this._powerLife);
                config.Game.lifeValue = config.Game.lifeValue + 50;
            }

            // player gets boss hit 
            if(managers.Collision.AABBCheck(this._player, this._enemyBoss))
            {
                createjs.Sound.play("explosion06");
                config.Game.lifeValue = config.Game.lifeValue - 20;  
            }

            // checks bullets collisions
            for(let i = 0; i < this._bullets.length; i++)
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
                    // shots the boss
                    if(managers.Collision.AABBCheck(this._bullets[i], this._enemyBoss))
                    {
                        //removes bullet
                        this.removeChild(this._bullets[i]);
                        this._bullets.splice(i, 1);

                        // sound and score
                        let soundExplosion = createjs.Sound.play("explosion06");
                        soundExplosion.volume = 1.5;
                        config.Game.scoreValue = config.Game.scoreValue + 10;

                        this._enemyBossLife -= 5;
                        if(this._enemyBossLife == 0)
                        { 
                            // removes enemy
                            this._enemyBoss.kill();
                            this.removeChild(this._enemyBoss);
                        }
                    }

                    if(managers.Collision.AABBCheck(this._bullets[i], this._powerStone1))
                    {
                        //removes bullet
                        this.removeChild(this._bullets[i]);
                        this._bullets.splice(i, 1);

                        // removes the stone
                        this._powerStone1.leaveScreen();
                        this.removeChild(this._powerStone1);
                        
                        // sound and score
                        let soundExplosion = createjs.Sound.play("explosion06");
                        soundExplosion.volume = 1.5;
                    }
                    if(managers.Collision.AABBCheck(this._bullets[i], this._powerStone2))
                    {
                        //removes bullet
                        this.removeChild(this._bullets[i]);
                        this._bullets.splice(i, 1);

                        // removes the stone
                        this._powerStone2.leaveScreen();
                        this.removeChild(this._powerStone2);
                        
                        // sound and score
                        let soundExplosion = createjs.Sound.play("explosion06");
                        soundExplosion.volume = 1.5;
                    }
                    if(managers.Collision.AABBCheck(this._bullets[i], this._powerStone3))
                    {
                        //removes bullet
                        this.removeChild(this._bullets[i]);
                        this._bullets.splice(i, 1);

                        // removes the stone
                        this._powerStone3.leaveScreen();
                        this.removeChild(this._powerStone3);
                        
                        // sound and score
                        let soundExplosion = createjs.Sound.play("explosion06");
                        soundExplosion.volume = 1.5;
                    }
                    if(managers.Collision.AABBCheck(this._bullets[i], this._powerStone4))
                    {
                        //removes bullet
                        this.removeChild(this._bullets[i]);
                        this._bullets.splice(i, 1);

                        // removes the stone
                        this._powerStone4.leaveScreen();
                        this.removeChild(this._powerStone4);
                        
                        // sound and score
                        let soundExplosion = createjs.Sound.play("explosion06");
                        soundExplosion.volume = 1.5;
                    }
                    for(let j = 0; j < this._enemyShips.length; j++)
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
                            config.Game.scoreValue = config.Game.scoreValue + 10;
                        }
                    } 
                }               
            }
            
             // enemies' player impact.
            for(let j = 0; j < this._enemyShips.length; j++)
            {
                this._enemyShips[j].Update();
                if(managers.Collision.AABBCheck(this._player, this._enemyShips[j]))
                {
                    createjs.Sound.play("explosion06");
                    config.Game.lifeValue = config.Game.lifeValue - 20;    
                    // removes enemy
                    this._enemyShips[j].kill();
                    this.removeChild(this._enemyShips[j]);
                    this._enemyShips.splice(j, 1);                      
                }
            }

            this.updateStats();
        }
      
        
        public Main(): void 
        {
            this.addChild(this._arena);
            this.addChild(this._lifeLabel);
            this.addChild(this._lifeBossLabel);
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
            this.addChild(this._enemyBoss);

            for (const enemyShip of this._enemyShips) {
                this.addChild(enemyShip);
            }
            
            window.addEventListener('keydown', (e)=>
            {
                if(!this._gameOver)
                {
                    if((e.keyCode == 17) && (config.Game.bulletsAmount > 0))// key Ctrl
                    {
                        let bullet = new objects.Bullet(
                            config.Game.ASSETS.getResult(this._bulletImage), "bullet"+this._bullets.length, this._player);
                        this.addChild(bullet);
                        this._bullets.push(bullet)
                        config.Game.bulletsAmount = config.Game.bulletsAmount - 1;
                    }
                    else
                        this._player.Move(e);
                }
            });

            this._resetButton.on("click", ()=>{
                this._sound.stop();
                config.Game.SCENE = scenes.State.START;
            });
        }

        
    }
}