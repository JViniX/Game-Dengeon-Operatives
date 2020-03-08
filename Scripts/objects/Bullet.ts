module objects
{
    export class Bullet extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;
        private _horizontalSpeed?:number;
        private _direction: objects.EnumDirections;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor(imageString:Object = config.Game.ASSETS.getResult("placeholder"), 
            name:string = 'BulletName', shooter: objects.Player)
        {
            switch (shooter.direction){
                case objects.EnumDirections.DOWN:
                    super(imageString, shooter.position.x-10, shooter.position.y + shooter.halfHeight, true);
                    break;
                case objects.EnumDirections.LEFT:
                    super(imageString, shooter.position.x - shooter.halfWidth, shooter.position.y-10, true);
                    break;
                case objects.EnumDirections.UP:
                    super(imageString, shooter.position.x+10, shooter.position.y - shooter.halfHeight, true);
                    break;
                case objects.EnumDirections.RIGHT:
                    super(imageString, shooter.position.x + shooter.halfWidth, shooter.position.y+10, true);
                    break;
            }
            this.name = name;
            this._direction = shooter.direction;
            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if((this.y >= config.Game.SCREEN_HEIGHT + this.height)||
                (this.x >= config.Game.SCREEN_WIDTH + this.width))
            {
                this.isColliding = true;
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
        public Start(): void 
        {
            createjs.Sound.play("laser1");
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            this._verticalSpeed = 7;
            this._horizontalSpeed = 7;           
            
            switch (this._direction){
                case objects.EnumDirections.UP:
                    this.velocity = new Vector2(0, this._verticalSpeed);
                    this.position = new Vector2(this.position.x, this.position.y-10);
                    break;
                case objects.EnumDirections.RIGHT:
                    this.velocity = new Vector2(this._horizontalSpeed, 0);
                    this.position = new Vector2(this.position.x+10, this.position.y);
                    break;
                case objects.EnumDirections.DOWN:
                    this.velocity = new Vector2(0, this._verticalSpeed);
                    this.position = new Vector2(this.position.x, this.position.y+10);
                    break;
                case objects.EnumDirections.LEFT:
                    this.velocity = new Vector2(this._horizontalSpeed, 0);
                    this.position = new Vector2(this.position.x-10, this.position.y);
                    break;
            }
        }

        
    }
}