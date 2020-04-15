module config
{
    export class Game
    {
        public static SCREEN_WIDTH:number = 1224;
        public static SCREEN_HEIGHT:number = 807;
        public static SCENE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static FPS: number = 60; // 60 Frames per second
        public static scoreValue: number;
        public static lifeValue: number;
        public static bulletsAmount: number;
        public static character: number;
    }
}