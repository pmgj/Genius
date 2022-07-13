import Type from './Type.js';
import Genius from './Genius.js';

function GUI() {
    let game;
    let colors = [];
    let sounds = [new Audio("beep0.mp3"), new Audio("beep1.mp3"), new Audio("beep2.mp3"), new Audio("beep3.mp3"), new Audio("end.mp3")];
    let colorsLeft = 0;
    let botoes = document.querySelectorAll("#colors div");
    function showColor(index) {
        let input = botoes[index];
        input.style.backgroundColor = "black";
        setTimeout(repintarCor, 250, index);
        sounds[index].play();
    }
    function repintarCor(index) {
        let input = botoes[index];
        input.style.backgroundColor = colors[index];
    }
    function blockInput() {
        botoes.forEach(b => b.onclick = undefined);
    }
    function unblockInput() {
        botoes.forEach(b => b.onclick = check);
    }
    function showSequence(vetor) {
        colorsLeft = vetor.length;
        setMessage("#round", colorsLeft);
        setMessage("#correct", 0);
        blockInput();
        for (let j = 0; j < vetor.length; j++) {
            setTimeout(showColor, (j + 1) * 1000, vetor[j]);
        }
        setTimeout(unblockInput, colorsLeft * 1000);
    }
    function play(evt) {
        game = new Genius();
        setMessage("#message", "");
        showSequence(game.getColors());
        evt.preventDefault();
    }
    function check() {
        let indice = colors.indexOf(this.id);
        showColor(indice);
        game.checkColor(indice);
        switch (game.getType()) {
            case Type.WRONG_COLOR:
                sounds[4].play();
                setMessage("#message", "Game over!");
                blockInput();
                break;
            case Type.NEW_COLOR:
                showSequence(game.getColors());
                break;
            case Type.CORRECT_COLOR:
                setMessage("#correct", game.getIndex());
        }
    }
    function setMessage(selector, value) {
        let rodada = document.querySelector(selector);
        rodada.textContent = value;
    }
    function init() {
        let form = document.forms[0];
        form.onsubmit = play;
        botoes.forEach(b => {
            b.onclick = check;
            colors.push(b.id);
        });
    }
    return { init };
}
let gui = new GUI();
gui.init();