import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { Platforms } from "./Platforms";
import { Hero } from "./Hero";
import { LabelScore } from "./LabelScore";
import { globals } from "./utils.js";
import { FinalScene } from "./FinalScene";

export class MainScene {
    constructor() {
        this.container = new PIXI.Container();
        this.createBackground();
        this.createPlatforms();
        this.createHero();
        this.createUI();
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    createPlatforms() {
        this.platforms = new Platforms();
        this.container.addChild(this.platforms.container);
    }

    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);

        this.container.eventMode = 'dynamic';
        this.container.on('pointerdown', () => {
            this.hero.startJump();
        });

        this.hero.sprite.once('die', () => {
            globals.scene.start(new FinalScene(this.hero.score));
        });
    }

    createUI() {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on('score', () => {
            this.labelScore.renderScore(this.hero.score);
        });
    }

    update(dt) {
        this.bg.update(dt);
        this.platforms.checkCollision(this.hero);
        this.platforms.update(dt)
        this.hero.update(dt);
    }
}