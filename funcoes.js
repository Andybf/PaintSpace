// Autor:               Anderson Bucchianico
// Data Criação:        12/jan/2019
// Ultima modificação:  15/jan/2019
// Descrição:           Funções diversas para definir as formas geradas pelo usuário.

//declaração das variaveis
var posX = 0;
var posY = 0;
var tam = 49;
var borda = 1;
var cor = "#ffffff";
var corBorda = "#000000";
var formActive = "Quadrado";
var corselecionada = "";

//variaveis para o efeito gráfico de fundo:
var contador = 4;
var H = 0;
var S = '70%';
var L = '80%';

//verifica se o usuario está ou não movendo enquanto clica
var drag = false;
// rotacao dos objetos, pode guardar valores de 0 a 315.
var rotacao = 0;

//configurações acessíveis ao usuário
var VelocidadeDeTransicao = 500; //em milissegundos
var EfeitosGraficos = false;
var PrevisualizacaoDaForma = true;

function deslgBotao(onoff){
    document.getElementById('tamanhomenos').disabled = onoff;
    document.getElementById('tamanhomais').disabled = onoff;
}

function resolucao() {
    //resgatando os valores digitados nas caixas de texto da resolução
    var largura = jQuery("input[name='pixelsX']").val();
    var altura = jQuery("input[name='pixelsY']").val();

    if (altura > 1080 || altura < 32) {
        alert("Este valor não é aceito! Digite um número entre 32 - 1080!");
        return 0;
    }
    else {
        if (largura > 1920 || largura < 32) {
            alert("Este valor não é aceito! Digite um número entre 32 - 1920!");
            return 0;
        }
    }
    ajustarTela(largura,altura);
}
function ajustarTela(largura,altura) {
    //modifica o tamanho da div onde fica o canvas:
    var tamanhoDiv = document.getElementById("tela");
    tamanhoDiv.style.width = parseInt(largura) + "px";
    tamanhoDiv.style.height = parseInt(altura) + "px";
    //reconstrói o canvas:
    ctx[0].canvas.width = largura;
    ctx[0].canvas.height = altura;
    ctx[0].fillStyle = "white";
    ctx[0].fillRect(0, 0, canvas.width, canvas.height);

    jQuery("input[name='pixelsX']").val(parseInt(largura));
    jQuery("input[name='pixelsY']").val(parseInt(altura));
}

//deleta os objetos criados
function limparTela(){
    ctx[0].clearRect(0, 0, canvas.width, canvas.height);
    ctx[0].fillStyle = "white";
    ctx[0].fillRect(0, 0, canvas.width, canvas.height);
    attStatus();
}

function mudarCor(){
    cor = jQuery("input[name='cor']").val();
    selForma();
    
}
function mudarCorBorda(){
    corBorda = jQuery("input[name='corborda']").val();
    selForma();
}

function selcor(posX,posY){
    function rgbToHex(rgb){ //subfunção dentro da função
        return '#' + ((rgb[0] << 16) | (rgb[1] << 8) | rgb[2]).toString(16);
    }
    posX = posX - tela.offsetLeft;
    posY = posY - tela.offsetTop;
    corselecionada = rgbToHex(ctx[0].getImageData(posX, posY, 1, 1).data);
    jQuery("input[name=cor]").val(corselecionada);
    jQuery("input[name=corborda]").val(corselecionada);
    //document.getElementById("colorSelector").value = corselecionada;
    cor = corselecionada;
    corBorda = corselecionada;
    mudarCor();
    mudarCorBorda();
}

function corFundo() {
    if (EfeitosGraficos == true) {
        if(H < 360 && H >= 0) {
            H += contador;
        } else {
            H = 0;
        }

        var cortopo = "hsl(" + H + ","+ S +","+ L +")";
        var corbaixo = "hsl(" + parseInt(H+60) + ","+ S +","+ L +")";
        var background = document.getElementById('body');
        background.style.backgroundImage = "linear-gradient(" + cortopo + "," + corbaixo + ")";
        background.style.backgroundImage = "linear-gradient( )";
        //console.log("H: "+H+" S: "+S + " L: " +L);
        //console.log(VelocidadeDeTransicao);
        setTimeout(corFundo, VelocidadeDeTransicao);
    }
}