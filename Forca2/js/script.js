var quantidadeErros = 0;
var acertos = 0;
var tentativas = "";

const form = document.querySelector("#form")
const buttonJogar = document.querySelector("#buttonJogar"); //escutando o button
const buttonAdd = document.querySelector("#buttonAdicionar"); //escutando o button
const textPalavra = document.querySelector("#palavra"); //escutando a textbox da palavra
const textDica = document.querySelector("#dica"); //escutando a texbox da dica
const buttonReset = document.querySelector("#buttonReset"); //escutando o button

var c = document.getElementById("forca");
var ctx = c.getContext("2d");

desenhaPoste();
desenhaBarraSuperior();
desenhaApoio();


buttonJogar.onclick = function () { jogar() }; //quando clicar aciona a function jogar

buttonAdd.onclick = function () { adicionarPalavra(event) }; //quando clicar vai adicionar a palavra no array

buttonReset.onclick = function () { resetar() }; // quando clicar vai resetar o game

function adicionarPalavra(event) {
    event.preventDefault();
    var palavra = textPalavra.value.toUpperCase();
    var dica = textDica.value.toUpperCase();
}


function jogar() {

    var palavra = textPalavra.value.toUpperCase();
    var dica = textDica.value.toUpperCase();
    window.onkeypress = teclaPressionada;

    desenhaTracos();

    mostrarDica();

    function teclaPressionada() {
        if (!tentativas.includes(event.key) && palavra.includes((event.key).toUpperCase())) {
            adicionaTentativa();
            for (var i = 0; i < palavra.length; i++) {
                if (palavra[i] == (event.key).toUpperCase()) {
                    ctx.font = "35px Arial";
                    ctx.fillText((event.key).toUpperCase(), 20 + (35 * i), 200);
                    acertos++;
                }
            }
        } else {
            adicionaTentativa();
            quantidadeErros++;
            desenhaBoneco(quantidadeErros);
        }
        verificaFimJogo();
    }

    function adicionaTentativa() {
        if (!tentativas.includes(event.key)) {
            tentativas = tentativas + event.key;
            ctx.font = "20px Arial";
            ctx.fillText("Tentativas: " + tentativas.toUpperCase(), 20, 280);
        }
    }

    function verificaFimJogo() {
        if (quantidadeErros >= 6) {
            ctx.font = "30px Arial";
            ctx.fillText("Você Perdeu! A palavra era: " + palavra, 150, 140);
            window.onkeypress = null;
            return;
        }
        if (acertos == palavra.length) {
            ctx.font = "30px Arial";
            ctx.fillText("Parabéns! você acertou a palavra :)", 150, 140);
            window.onkeypress = null;
            return;
        }
    }

    function desenhaTracos() {
        for (var i = 0; i < palavra.length; i++) {
            ctx.moveTo(20 + (35 * i), 200);
            ctx.lineTo(50 + (35 * i), 200);
            ctx.stroke();
        }
    }

    function mostrarDica() {
        ctx.font = "20px Arial";
        ctx.fillText(dica + " " + "com" + " " + palavra.length + " " + "letras.", 200, 30);
    }

    form.reset();


}


function desenhaPoste() {
    ctx.moveTo(10, 10);
    ctx.lineTo(10, 100);
    ctx.stroke();
}

function desenhaBarraSuperior() {
    ctx.moveTo(10, 10);
    ctx.lineTo(60, 10);
    ctx.stroke();
}

function desenhaApoio() {
    ctx.moveTo(60, 10);
    ctx.lineTo(60, 30);
    ctx.stroke();
}


function desenhaBoneco(quantidadeErros) {
    switch (quantidadeErros) {
        case 1:
            desenhaCabeca();
            break;
        case 2:
            desenhaTronco();
            break;
        case 3:
            desenhaBracoEsquerdo();
            break;
        case 4:
            desenhaBracoDireito();
            break;
        case 5:
            desenhaPernaEsquerda();
            break;
        case 6:
            desenhaPernaDireita();
            break;
    }
}

function desenhaCabeca() {
    ctx.beginPath();
    ctx.arc(60, 40, 10, 0, Math.PI * 2, true); // Círculo exterior
    ctx.moveTo(110, 75);
    ctx.stroke();
}

function desenhaTronco() {
    ctx.moveTo(60, 50);
    ctx.lineTo(60, 80);
    ctx.stroke();
}

function desenhaBracoEsquerdo() {
    ctx.moveTo(60, 60);
    ctx.lineTo(50, 70);
    ctx.stroke();
}

function desenhaBracoDireito() {
    ctx.moveTo(60, 60);
    ctx.lineTo(70, 70);
    ctx.stroke();
}

function desenhaPernaEsquerda() {
    ctx.moveTo(60, 80);
    ctx.lineTo(50, 90);
    ctx.stroke();
}

function desenhaPernaDireita() {
    ctx.moveTo(60, 80);
    ctx.lineTo(70, 90);
    ctx.stroke();
}

function resetar() {
    window.location.reload();
}