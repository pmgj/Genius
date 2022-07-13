import Type from './Type.js';

export default class Genius {
    constructor() {
        this.type = null;
        this.colors = [];
        this.colors.push(Math.floor(Math.random() * 4));
        this.index = 0;
    }
    checkColor(color) {
        if (color !== this.colors[this.index]) {
            this.colors = [];
            this.index = 0;
            this.type = Type.WRONG_COLOR;
        } else {
            if (this.colors.length === ++this.index) {
                this.index = 0;
                this.colors.push(Math.floor(Math.random() * 4));
                this.type = Type.NEW_COLOR;
            } else {
                this.type = Type.CORRECT_COLOR;
            }
        }
    }
    getType() {
        return this.type;
    }
    getColors() {
        return this.colors;
    }
    getIndex() {
        return this.index;
    }
}
