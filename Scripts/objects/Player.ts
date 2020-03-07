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

        // CONSTRUCTOR
        constructor(imagePath:Object, name:string, x:number = 0, y:number= 0, isCentered:boolean = false)
        {
            super(imagePath, x, y, isCentered);
            this.name = name;

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
           
        }

        // PUBLIC METHODS
        public Move(e: KeyboardEvent) {
            switch (e.keyCode){
                case this._kleft:
                    this.x = this.x - 10;
                    this.rotation = -90;
                    break;
                case this._kup:
                    this.y = this.y - 10;
                    this.rotation = 0;
                    break;
                case this._kright:
                    this.x = this.x + 10;
                    this.rotation = 90;
                    break;
                case this._kdown:
                    this.y = this.y + 10;
                    this.rotation = 180;
                    break;
            }
        }

        public Start(): void {
        }

        public Update(): void {
        }

        public Reset(): void {
           
        }

        
    }
}