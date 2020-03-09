module objects
{
    export class EnemyShip extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;
        private _horizontalSpeed?:number;
        private _direction: objects.EnumDirections;

        // PUBLIC PROPERTIES
        public life: number;

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.ASSETS.getResult("enemyShip"), 0, 0, true);
            
            this._direction = Math.floor(util.Mathf.RandomRange(objects.EnumDirections.UP, objects.EnumDirections.LEFT));
            // this._direction = objects.EnumDirections.DOWN.valueOf();
            switch (this._direction){
                case objects.EnumDirections.DOWN:
                    this.position = new Vector2(config.Game.SCREEN_WIDTH/2, 0-this.height);
                    this.rotation = 180;
                    break;
                case objects.EnumDirections.LEFT:
                    this.position = new Vector2(config.Game.SCREEN_WIDTH+this.width, config.Game.SCREEN_HEIGHT/2);
                    this.rotation = -90;
                    break;
                case objects.EnumDirections.UP:
                    this.position = new Vector2(config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT+this.height);
                    this.rotation = 0;
                    break;
                case objects.EnumDirections.RIGHT:
                    this.position = new Vector2(0-this.width, config.Game.SCREEN_HEIGHT/2);
                    this.rotation = 90;
                    break;
            }
            
            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if((this.position.y >= config.Game.SCREEN_HEIGHT + this.height)||
                (this.position.y <= 0 - this.height)||
                (this.position.x >= config.Game.SCREEN_WIDTH + this.width)||
                (this.position.x <= 0 - this.width))
            {
                this.Reset();
            }
        }       
        
        private _move():void
        {
            //this.position = Vector2.add(this.position, this.velocity);

            switch (this._direction){
                case objects.EnumDirections.UP:
                    this.position = Vector2.subtract(this.position, this.velocity);
                    break;
                case objects.EnumDirections.RIGHT:
                    this.position = Vector2.add(this.position, this.velocity);
                    break;
                case objects.EnumDirections.DOWN:
                    this.position = Vector2.add(this.position, this.velocity);
                    break;
                case objects.EnumDirections.LEFT:
                    this.position = Vector2.subtract(this.position, this.velocity);
                    break;
            }
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            // this.alpha = 0.5; // 50% transparent
            this.life = 5;
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {       
            this._verticalSpeed = util.Mathf.RandomRange(2, 5);
            this._horizontalSpeed = util.Mathf.RandomRange(2, 5);           
            

            let randomX = util.Mathf.RandomRange(0, config.Game.SCREEN_WIDTH);
            let randomY = util.Mathf.RandomRange(0, config.Game.SCREEN_HEIGHT);

            let newDirection = Math.floor(util.Mathf.RandomRange(objects.EnumDirections.UP, objects.EnumDirections.LEFT));
            if(this._direction != newDirection)
            {
                this._direction = newDirection;
                let aux = this.height;
                this.height = this.width;
                this.width = aux;
            }

            switch (this._direction){
                
                case objects.EnumDirections.UP:
                    this.velocity = new Vector2(0, this._verticalSpeed);
                    this.position = new Vector2(randomX, config.Game.SCREEN_HEIGHT+this.height);
                    this.rotation = 0;
                    break;
                    
                case objects.EnumDirections.RIGHT:
                    this.velocity = new Vector2(this._horizontalSpeed, 0);
                    this.position = new Vector2(-randomX, randomY);
                    this.rotation = 90;
                    break;

                case objects.EnumDirections.DOWN:
                    this.velocity = new Vector2(0, this._verticalSpeed);
                    this.position = new Vector2(randomX, -this.height);
                    this.rotation = 180;
                    break;

                case objects.EnumDirections.LEFT:
                    this.velocity = new Vector2(this._horizontalSpeed, 0);
                    this.position = new Vector2(config.Game.SCREEN_WIDTH+this.width, randomY);
                    this.rotation = -90;
                    break;
            }
            
            
        }
    }
}