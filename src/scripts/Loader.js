import { LoaderConfig } from "./LoaderConfig";
import { Globals } from "./Globals";

export class Loader {
    constructor(loader) {
        this.loader = loader;
        this.resources = LoaderConfig;
    }

    preload() {
        return new Promise(async resolve => {
            for (const key in this.resources) {
                this.loader.add({ alias: key, src: this.resources[key] });
                Globals.resources[key] = await this.loader.load(key);
            }
            resolve();
        });
    }
}