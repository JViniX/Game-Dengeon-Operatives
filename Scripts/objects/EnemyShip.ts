module objects
{
    export class EnemyShip extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;
        private _horizontalSpeed?:number;
        private _direction: objects.EnumDirections;
        private _isDead:boolean;
        private _isRandomDirection:boolean = false;
        
        // PUBLIC PROPERTIES
        

        // CONSTRUCTOR
        constructor(imagePath:Object, name:string, randomPosittion?: boolean)
        {
            super(imagePath, 0, 0, true);
            this.name = name;
            this._isRandomDirection = randomPosittion;
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
            if((this.position.y >= config.Game.SCREEN_HEIGHT + (this.height*2))||
                (this.position.y <= 0 - (this.height*2))||
                (this.position.x >= config.Game.SCREEN_WIDTH + (this.width*2)||
                (this.position.x <= 0 - (this.width*2))))
            {
                this.Reset();
            }
        }       
        
        private _move():void
        {
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

        // when it's dead, moves to outside the canvas.
        public kill(): void{
            this._isDead = true;
            this.position.x = -200;
            this.position.y = -200;
        }

        public Start(): void 
        {
            this.Reset();
        }
        
        public Update(): void 
        {
            if(!this._isDead) 
            {
                this._move();
                this._checkBounds();
            }
        }
        
        public Reset(): void 
        {       
            this.isColliding = false;
            this._verticalSpeed = util.Mathf.RandomRange(2, 5);
            this._horizontalSpeed = util.Mathf.RandomRange(2, 5);           
            
            // defines new direction.
            let newDirection = 0;
            if(this._isRandomDirection)
            {
                newDirection = Math.floor(util.Mathf.RandomRange(objects.EnumDirections.UP, objects.EnumDirections.LEFT));
            }
            else{ //if randomDirection is false, it just reverses de direction.
                if(this._direction == objects.EnumDirections.UP) newDirection = objects.EnumDirections.DOWN;
                if(this._direction == objects.EnumDirections.DOWN) newDirection = objects.EnumDirections.UP;
                if(this._direction == objects.EnumDirections.LEFT) newDirection = objects.EnumDirections.RIGHT;
                if(this._direction == objects.EnumDirections.RIGHT) newDirection = objects.EnumDirections.LEFT;
            }

            // adjusts the bounds.
            if(this._direction != newDirection)
            {
                this._direction = newDirection;
                let aux = this.height;
                this.height = this.width;
                this.width = aux;
            }

            // sets the position accordingly.
            let randomX = util.Mathf.RandomRange(0, config.Game.SCREEN_WIDTH);
            let randomY = util.Mathf.RandomRange(0, config.Game.SCREEN_HEIGHT);
            switch (this._direction){
                
                case objects.EnumDirections.UP:
                    this.velocity = new Vector2(0, this._verticalSpeed);
                    this.position = new Vector2(randomX, config.Game.SCREEN_HEIGHT+this.height);
                    this.rotation = 0;
                    break;
                    
                case objects.EnumDirections.RIGHT:
                    this.velocity = new Vector2(this._horizontalSpeed, 0);
                    this.position = new Vector2(0, randomY);
                    this.rotation = 90;
                    break;

                case objects.EnumDirections.DOWN:
                    this.velocity = new Vector2(0, this._verticalSpeed);
                    this.position = new Vector2(randomX, -this.height);
                    this.rotation = 180;
                    break;

                case objects.EnumDirections.LEFT:
                    this.velocity = new Vector2(this._horizontalSpeed, 0);
                    this.position = new Vector2(config.Game.SCREEN_WIDTH, randomY);
                    this.rotation = -90;
                    break;
            }
            
            
        }
    }
}