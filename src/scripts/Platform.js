import * as PIXI from "pixi.js";
import { globals, getRandomNumber } from "./utils.js";
import { Diamond } from "./Diamond";

const TILE_SIZE = 64;


export class Platform {
    constructor(rows, cols, x) {
        this.diamonds = [];
        this.diamondsOffsetMin = 100;
        this.diamondsOffsetMax = 200;

        this.speed = 4;

        this.rows = rows;
        this.cols = cols;

        this.height = rows * TILE_SIZE;
        this.width = cols * TILE_SIZE;

        this.createContainer(x);
        this.createTiles();
        this.createDiamonds();
    }

    get left() {
        return this.container.x;
    }
    get nextLeft() {
        return this.left - this.speed;
    }
    get right() {
        return this.left + this.width;
    }
    get top() {
        return this.container.y;
    }
    get bottom() {
        return this.top + this.height;
    }

    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.rows * TILE_SIZE;
    }

    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }

    createTile(row, col) {
        const texture = row === 0 ? 'platform' : 'tile';
        const tile = new PIXI.Sprite(globals.resources[texture]);
        this.container.addChild(tile);
        tile.x = col * tile.width;
        tile.y = row * tile.height;
    }

    createDiamonds() {
        const y = getRandomNumber(this.diamondsOffsetMin, this.diamondsOffsetMax);

        for (let i = 0; i < this.cols; i++) {
            // 40%
            if (Math.random() < 0.4) {
                const diamond = new Diamond(TILE_SIZE * i, -y);
                this.container.addChild(diamond.sprite);
                this.diamonds.push(diamond);
            }
        }
    }

    move() {
        this.container.x -= this.speed;

        if (this.right < 0) {
            this.container.emit('hidden');
        }
    }

    checkCollision(hero) {
        this.diamonds.forEach(diamond => {
            diamond.checkCollision(hero);
        })

        if (this.isCollideTop(hero)) {
            hero.stayOnPlatform(this);
        } else {
            if (hero.platform === this) {
                hero.platform = null;
            }

            if (this.isCollideLeft(hero)) {
                hero.moveByPlatform(this);
            }
        }
    }

    isCollideTop(hero) {
        return (
            hero.right >= this.left &&
            hero.left <= this.right &&
            hero.bottom <= this.top &&
            hero.nextBottom >= this.top
        );
    }
    isCollideLeft(hero) {
        return (
            hero.bottom >= this.top &&
            hero.top <= this.bottom &&
            hero.right <= this.left &&
            hero.right >= this.nextLeft
        );
    }
}