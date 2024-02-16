import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { LabelScore } from "./LabelScore";
import { globals } from "./utils.js";
import { MainScene } from "./MainScene";

export class FinalScene {
    constructor(score) {
        this.container = new PIXI.Container();

        this.createBackground();
        this.createPopup();
        this.createLabelScore(score);
        this.createText();

        this.container.eventMode = 'static';
        this.container.once('pointerdown', () => {
            globals.scene.start(new MainScene());
        });
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    createPopup() {
        this.popup = new PIXI.Graphics();
        const width = 600;
        const height = 400;
        const x = (window.innerWidth / 2) - (width / 2);
        const y = (window.innerHeight / 2) - (height / 2);
        this.popup.beginFill(0x000000, 0.5);

        this.popup.drawRect(x, y, width, height);
        this.container.addChild(this.popup);
    }

    createLabelScore(score) {
        this.labelScore = new LabelScore(window.innerWidth / 2, window.innerHeight / 2, 0.5);
        this.container.addChild(this.labelScore);
        this.labelScore.renderScore(score);
        this.container.addChild(this.labelScore);
    }

    createText() {
        const text = new PIXI.Text();
        text.x = window.innerWidth / 2;
        text.y = (window.innerHeight / 2) + 100;
        text.anchor.set(0.5);
        text.style = {
            fontFamily: 'Verdana',
            fontWeight: 'normal',
            fontSize: 30,
            fill: ['#FFFFFF']
        };
        text.text = 'Restart';
        this.popup.addChild(text);
    }
}