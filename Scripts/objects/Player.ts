module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _kleft = 37;
        private _kup = 38;
        private _kright = 39;
        private _kdown = 40;
        
        // PUBLIC PROPERTIES
        public direction: objects.EnumDirections;

        // CONSTRUCTOR
        constructor(imagePath:Object, name:string, x:number = 0, y:number= 0, isCentered:boolean = false)
        {
            super(imagePath, x, y, isCentered);
            this.name = name;
            this.direction = objects.EnumDirections.UP;
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            //console.log("Player _checkBounds. " + this.halfWidth +" - " +this.halfHeight + " - "+ this.position.toString());
            if ((this.position.x - this.halfWidth <= 0) || 
                (this.position.x + this.halfWidth >= config.Game.SCREEN_WIDTH) ||
                (this.position.y - this.halfHeight <= 0) ||
                (this.position.y + this.halfHeight >= config.Game.SCREEN_HEIGHT))
            {
                this.isColliding = true;
                //console.log("Player _checkBounds. Entrou " + this.x +" - " +this.y + " - "+ this.position.toString());
            }
           
        }

        // PUBLIC METHODS
        public Move(e: KeyboardEvent) {

            //console.log("e.keyCode: "+e.keyCode);
            let newDirection: objects.EnumDirections;

            switch (e.keyCode){
                case this._kup:
                    newDirection = objects.EnumDirections.UP;
                    if(!this.isColliding || (this.direction != newDirection))
                    { 
                        this.position.y = this.position.y - 10;
                        this.isColliding = false;
                    }
                    this.rotation = 0;
                    break;
                case this._kright:
                    newDirection = objects.EnumDirections.RIGHT;
                    if(!this.isColliding || (this.direction != newDirection)) 
                    {
                        this.position.x = this.position.x + 10;
                        this.isColliding = false;
                    }
                    this.rotation = 90;
                    break;
                case this._kdown:
                    newDirection = objects.EnumDirections.DOWN;
                    if(!this.isColliding || (this.direction != newDirection)) 
                    {
                        this.position.y = this.position.y + 10;
                        this.isColliding = false;
                    }
                    this.rotation = 180;
                    break;
                case this._kleft:
                    newDirection = objects.EnumDirections.LEFT;
                    if(!this.isColliding || (this.direction != newDirection)) 
                    {
                        this.position.x = this.position.x - 10;
                        this.isColliding = false;
                    }
                    this.rotation = -90;
                    break;
            }

            if(this.direction != newDirection)
            {
                this.direction = newDirection;
                let aux = this.height;
                this.height = this.width;
                this.width = aux;
                //console.log("Size! - "+ this.name+" : W"+ this.width + " - H"+ this.height);
            }
            
        }

        public Start(): void {
        }

        public Update(): void {
            this._checkBounds();
            //console.log("Player Updated. " + this.x +" - " +this.y + " - "+ this.position.toString());
        }

        public Reset(): void {
           
        }

        
    }
}