import * as PIXI from "pixi.js";
import { globals } from "./utils.js";

const TILE_SIZE = 64;

export class Platform {
    constructor(rows, cols, x) {
        this.speed = 0.5;

        this.rows = rows;
        this.cols = cols;

        this.height = rows * TILE_SIZE;
        this.width = cols * TILE_SIZE;

        this.createContainer(x);
        this.createTiles();
    }

    get left() {
        return this.container.x;
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

    move() {
        this.container.x -= this.speed;

        if (this.right < 0) {
            this.container.emit('hidden');
        }
    }
}