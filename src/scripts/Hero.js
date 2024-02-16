import * as PIXI from "pixi.js";
import { globals } from "./utils.js";

export class Hero {
    constructor() {
        this.score = 0;
        this.dy = 0;
        this.jumpCounter = 0;
        this.platform = null;

        this.sprite = new PIXI.AnimatedSprite([
            globals.resources['walk1'],
            globals.resources['walk2']
        ]);
        this.sprite.x = 200;
        this.sprite.y = 100;

        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
    }

    get left() {
        return this.sprite.x;
    }
    get right() {
        return this.left + this.sprite.width;
    }
    get top() {
        return this.sprite.y;
    }
    get bottom() {
        return this.top + this.sprite.height;
    }
    get nextBottom() {
        return this.bottom + this.dy;
    }

    stayOnPlatform(platform) {
        this.platform = platform;
        this.dy = 0;
        this.jumpCounter = 0;
        this.sprite.y = platform.top - this.sprite.height;
    }
    moveByPlatform(platform) {
        this.sprite.x = platform.nextLeft - this.sprite.width;
    }

    startJump() {
        if (this.platform || this.jumpCounter === 1) {
            this.platform = null;
            this.dy = -20;
            this.jumpCounter++;
        }
    }

    collectDiamond() {
        this.score++;
        this.sprite.emit('score');
    }

    isAlive() {
        return this.top < window.innerHeight;
    }

    update(dt) {
        if (!this.platform) {
            this.dy++;
            this.sprite.y += this.dy;
        }

        if (!this.isAlive()) {
            this.sprite.emit('die');
        }
    }
}