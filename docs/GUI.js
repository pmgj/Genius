import Type from './Type.js';
import Genius from './Genius.js';

class GUI {
    constructor() {
        this.colors = [];
        this.sounds = [new Audio("beep0.mp3"), new Audio("beep1.mp3"), new Audio("beep2.mp3"), new Audio("beep3.mp3"), new Audio("end.mp3")];
        this.buttons = document.querySelectorAll("#colors div");
        this.game = null;
    }
    setMessage(selector, msg) {
        let message = document.querySelector(selector);
        message.textContent = msg;
    }
    async check(evt) {
        let color = this.colors.indexOf(evt.target.id);
        this.game.checkColor(color);
        this.setMessage("#correct", this.game.getIndex());
        new Promise(resolve => this.paintColor(resolve, color));
        switch (this.game.getType()) {
            case Type.WRONG_COLOR:
                this.setMessage("#message", "You lose!");
                this.sounds[4].play();
                this.blockButtons();
                break;
            case Type.NEW_COLOR:
                this.paintSequence(this.game.getColors());
                break;
            case Type.CORRECT_COLOR:
                break;
        }
    }
    paintColor(resolve, index) {
        this.sounds[index].play();
        let input = this.buttons[index];
        input.style.animationName = `${input.id}-animation`;
        input.onanimationend = () => {
            input.style.animationName = "";
            setTimeout(() => resolve(true), 500);
        };
    }
    async innerPaint(array) {
        this.blockButtons();
        this.setMessage("#round", array.length);
        this.setMessage("#correct", 0);
        for (let i = 0; i < array.length; i++) {
            await new Promise(resolve => this.paintColor(resolve, array[i]));
        }
        this.unblockButtons();
    }
    paintSequence(array) {
        setTimeout(this.innerPaint.bind(this), 1000, array);
    }
    blockButtons() {
        this.buttons.forEach(i => i.onclick = undefined);
    }
    unblockButtons() {
        this.buttons.forEach(i => i.onclick = this.check.bind(this));
    }
    play(evt) {
        evt.preventDefault();
        this.setMessage("#message", "");
        this.game = new Genius();
        this.paintSequence(this.game.getColors());
    }
    init() {
        let form = document.forms[0];
        form.onsubmit = this.play.bind(this);
        this.buttons.forEach(b => {
            b.onclick = this.check.bind(this);
            this.colors.push(b.id);
        });
    }
}
let gui = new GUI();
gui.init();