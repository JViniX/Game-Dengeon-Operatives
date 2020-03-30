/**
 * Julio Vinicius A. de Carvalho
 * 301016383
 * Feb 15, 2020
 * Slot Machine - Assignment 1
 * COMP397 - Web Gaming Development
 */

module objects
{
    export class Image extends GameObject
    {
        
        // constructor
        constructor(imagePath:Object = config.Game.ASSETS.getResult("placeholder"), imageName:string = 'ImageName', x:number = 0, y:number= 0, isCentered:boolean = false)
        {
            super(imagePath, x, y, isCentered);
            this.name = imageName;

            this.Start();
        }
        
        // PRIVATE METHODS
        protected _checkBounds(): void {
            
        }

        // PUBLIC METHODS
        public leaveScreen(): void{
            this.position.x = -200;
            this.position.y = -200;
        }

        public showAtScreen(newX: number, newY: number): void{
            this.position.x = newX;
            this.position.y = newY;
        }

        public setImage(imagePath:Object):void
        {
            //this.image = new createjs.Bitmap(imagePath).image;

            let background : createjs.Bitmap;
            background.image = new createjs.Bitmap("").image;
        }

        public Start(): void {
            
        }

        public Update(): void {
            
        }

        public Reset(): void {
            
        }
    }
}