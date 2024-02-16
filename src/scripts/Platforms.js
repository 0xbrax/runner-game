import * as PIXI from "pixi.js";
import { Platform } from "./Platform";
import { getRandomNumber } from "./utils.js";

const RANGES = {
    rows: {
        min: 2,
        max: 6
    },
    cols: {
        min: 3,
        max: 9
    },
    offset: {
        min: 60,
        max: 200
    }
}

export class Platforms {
    constructor() {
        this.platforms = [];
        this.container = new PIXI.Container();

        this.createPlatform({
            rows: 4,
            cols: 6,
            x: 200
        });
    }

    get randomData() {
        return {
            rows: getRandomNumber(RANGES.rows.min, RANGES.rows.max),
            cols: getRandomNumber(RANGES.cols.min, RANGES.cols.max),
            x: this.current.right + getRandomNumber(RANGES.offset.min, RANGES.offset.max)
        }
    }

    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
        this.platforms.push(platform);
        this.current = platform;

        platform.container.once('hidden', () => {
            this.platforms = this.platforms.filter(item => item !== platform);
            platform.container.destroy();
        })
    }

    checkCollision(hero) {
        this.platforms.forEach(platform => {
            platform.checkCollision(hero);
        })
    }

    update(dt) {
        if (this.current.right < window.innerWidth) {
            this.createPlatform(this.randomData);
        }

        this.platforms.forEach(platform => {
            platform.move();
        })
    }
}