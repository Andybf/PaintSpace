// Autor:               Anderson Bucchianico
// Data Criação:        12/jan/2019
// Ultima modificação:  15/jan/2019
// Descrição:           Cria e prepara o canvas, além de adicionar os monitoradores
//                      de eventos (Listeners) para detectar ação do usuário.

var canvas;
var cvforma;
var modo = 0;
var ctx = [];

function iniciarCanvas() {
    //inicia  canvas
    canvas = document.getElementById('tela');
    ctx[0] = canvas.getContext("2d"); 
    //definir resolução
    ajustarTela(window.window.innerWidth/1.25,window.window.innerHeight/1.25);
    //atualizar interface
    attStatus();
    //definir cores padrao
    $("input[name=cor]").val(cor);
    $("input[name=corborda]").val(corBorda);

    //var previsu = jQuery("canvas[name=formaativa]");
    var previsu = document.getElementById("formaativa");
    document.getElementById('efeitos').checked = false;
    document.getElementById('slide').value = VelocidadeDeTransicao;

    var slider = document.getElementById("slide");

    slider.onchange = function() {
        VelocidadeDeTransicao = $('#slide').val();
        console.log(VelocidadeDeTransicao);
    }

    //Eventos que acontecem ao clicar com o mouse
    window.addEventListener('mousemove', function(evento) {
        if (PrevisualizacaoDaForma) {
            previsu.style.top =  evento.clientY + 1 + "px";
            previsu.style.left =  evento.clientX + 1 + "px";
        }
    }, false);

    canvas.addEventListener('click', function(evento) {
        switch (formActive) {
            case "Circulo":
                criarCirculo(evento.clientX, evento.clientY,0);
            break;
            case "Quadrado":
                criarQuadrado(evento.clientX, evento.clientY,0);
            break;
            case "Triangulo":
                criarTriangulo(evento.clientX, evento.clientY,0);
            break;
            case "Pixel":
                criarPixel(evento.clientX, evento.clientY,0);
            break;
            case "SelCor":
                selcor(evento.clientX, evento.clientY,0);
            break;
            default:
                alert("Não foi possível criar nenhuma forma!" +
                "\n" +
                "Selecione uma forma no painel esquerdo.");
        }
    }, false);

    //eventos que acontecem ao mover o mouse
    canvas.addEventListener('mousemove', function(evento) {
        if(drag){
            switch (formActive) {
                case "Circulo":
                    criarCirculo(evento.clientX, evento.clientY,0);
                break;
                case "Quadrado":
                    criarQuadrado(evento.clientX, evento.clientY,0);
                break;
                case "Triangulo":
                    criarTriangulo(evento.clientX, evento.clientY,0);
                break;
                case "Pixel":
                    criarPixel(evento.clientX, evento.clientY,0);
                break;
                default:
                    alert("Não foi possível criar nenhuma forma!" +
                    "\n" +
                    "Selecione uma forma no painel esquerdo.");
            }
        }
        attStatus((evento.clientX-canvas.offsetLeft),(evento.clientY-canvas.offsetTop));
    }, false);

    canvas.addEventListener('mousedown', function(evento) {
        if (PrevisualizacaoDaForma) {
            previsu.style.display = "none"
        }
        drag = true;
    }, false);
    canvas.addEventListener('mouseup', function(evento) {
        if (PrevisualizacaoDaForma) {
            previsu.style.display = "inherit"
        }
        drag = false;
    }, false);
    canvas.addEventListener('mouseout', function(evento) {
        drag = false;
    }, false);
}

function iniciarPrevisu() {
    var previsuopc = document.getElementById("previsu");
    document.getElementById('previsu').checked = true;

    previsuopc.onclick = function() {
        if (PrevisualizacaoDaForma) {
            PrevisualizacaoDaForma = false
            $('#formaativa').hide('fast');
        } else {
            PrevisualizacaoDaForma = true;
            $('#formaativa').show('fast');
        }
    }

    cvforma = document.getElementById('formaativa');
    ctx[1] = cvforma.getContext("2d");
    selForma();
}

function attStatus(mouseX,mouseY){
    //evita que seja exibido "undefined" nas coordenadas:
    if(mouseX == undefined && mouseY == undefined){
        mouseX = 0;
        mouseY = 0;
    }
    $("div[name=tamanho]").text(tam + "px");
    $("div[name=rotacao]").text(rotacao + "°");
    $("div[name=borda]").text(borda + "px");
    $("div[name=cor]").text(cor);
    $("div[name=corborda]").text(corBorda);
    $("div[name=displayposicao]").text("Coordenadas: " + mouseX + "x " + mouseY + "y");
}
