import * as PIXI from "pixi.js";
import { globals } from "./utils.js";

export class Diamond {
    constructor(x, y) {
        this.sprite = new PIXI.Sprite(globals.resources["diamond"]);
        this.sprite.x = x;
        this.sprite.y = y;
    }

    get left() {
        return this.sprite.x + this.sprite.parent.x;
    }
    get right() {
        return this.left + this.sprite.width;
    }
    get top() {
        return this.sprite.y + this.sprite.parent.y;
    }
    get bottom() {
        return this.top + this.sprite.height;
    }

    checkCollision(hero) {
        if (!this.sprite) return;

        if (this.isOverlap(hero)) {
            hero.collectDiamond();
            this.sprite.destroy();
            this.sprite = null;
        }
    }

    isOverlap(hero) {
        return (
            hero.bottom >= this.top &&
            hero.top <= this.bottom &&
            hero.right >= this.left &&
            hero.left <= this.right
        );
    }
}