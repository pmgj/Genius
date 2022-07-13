class GUI {
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.colors = [];
        this.sounds = [new Audio("beep0.mp3"), new Audio("beep1.mp3"), new Audio("beep2.mp3"), new Audio("beep3.mp3"), new Audio("end.mp3")];
        this.buttons = document.querySelectorAll("#colors div");
        this.type = "REST";
    }
    setMessage(selector, msg) {
        let message = document.querySelector(selector);
        message.textContent = msg;
    }
    async check(evt) {
        let color = this.colors.indexOf(evt.target.id);
        let promise = new Promise(resolve => this.paintColor(resolve, color));
        await promise;
        this.xhr.onload = () => {
            let obj = JSON.parse(this.xhr.responseText);
            switch (obj.type) {
                case "WRONG_COLOR":
                    this.setMessage("#message", "You lose!");
                    this.sounds[4].play();
                    this.blockButtons();
                    break;
                case "NEW_COLOR":
                    this.paintSequence(obj.colors);
                    break;
                case "CORRECT_COLOR":
                    this.setMessage("#correct", obj.index);
            }
        };
        if (this.type == "Servlet") {
            let formData = new FormData();
            formData.append("color", color);
            this.xhr.open("put", "ServletGenius");
            this.xhr.send(formData);
        } else {
            this.xhr.open("put", "webresources/genius");
            this.xhr.setRequestHeader("Content-Type", "application/json");
            this.xhr.send(JSON.stringify({color: color}));
        }
    }
    paintColor(resolve, index) {
        this.sounds[index].play();
        let input = this.buttons[index];
        input.style.animationName = `${input.id}-animation`;
        input.onanimationend = () => {
            input.style.animationName = "";
            setTimeout(() => resolve(true), 1000);
        };
    }
    async paintSequence(array) {
        this.blockButtons();
        this.setMessage("#round", array.length);
        this.setMessage("#correct", 0);
        for (let i = 0; i < array.length; i++) {
            let promise = new Promise(resolve => this.paintColor(resolve, array[i]));
            await promise;
        }
        this.unblockButtons();
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
        this.xhr.onload = () => {
            let obj = JSON.parse(this.xhr.responseText);
            this.paintSequence(obj.colors);
        };
        if (this.type == "Servlet") {
            this.xhr.open("post", "ServletGenius");
        } else {
            this.xhr.open("post", "webresources/genius");
        }
        this.xhr.send(null);
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