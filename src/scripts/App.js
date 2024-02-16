import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Loader } from "./Loader";
import { MainScene } from "./MainScene";
import { globals } from "./utils.js";
import { SceneManager } from "./SceneManager.js";

export class App {
    run() {
        this.app = new PIXI.Application({ resizeTo: window });
        document.body.appendChild(this.app.view);

        globals.scene = new SceneManager();
        this.app.stage.addChild(globals.scene.container);
        // delta time
        this.app.ticker.add(dt => globals.scene.update(dt));

        this.loader = new Loader(PIXI.Assets);
        this.loader.preload().then(() => {
            globals.scene.start(new MainScene());
        });
    }
}