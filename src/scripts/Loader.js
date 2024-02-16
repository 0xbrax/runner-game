import { LoaderConfig } from "./LoaderConfig";
import { globals } from "./utils.js";

export class Loader {
    constructor(loader) {
        this.loader = loader;
        this.resources = LoaderConfig;
    }

    preload() {
        return new Promise(async resolve => {
            for (const key in this.resources) {
                this.loader.add({ alias: key, src: this.resources[key] });
                globals.resources[key] = await this.loader.load(key);
            }
            resolve();
        });
    }
}