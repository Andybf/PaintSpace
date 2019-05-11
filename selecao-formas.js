// Autor:               Anderson Bucchianico
// Data Criação:        12/jan/2019
// Ultima modificação:  12/jan/2019
// Descrição:           Funções que serão ativadas quando o usuário selecionar uma forma.
//                      Sem este arquivo, não será possível selecionar nenhuma forma.

function selForma() {
    if (formActive == "Circulo") {
        selectCirculo();
    }
    if (formActive == "Quadrado") {
        selectQuadrado();
    }
    if (formActive == "Triangulo") {
        selectTriangulo();
    }
    if (formActive == "Pixel") {
        selectPixel();
    }
    else {
        attStatus();
    }
}

function selectCirculo(){
    formActive = "Circulo";
    //deslgBotao(false);
    criarCirculo(0,0,1);
    attStatus();
}
function selectQuadrado(){
    formActive = "Quadrado";
    //deslgBotao(false);
    criarQuadrado(0,0,1);
    attStatus();
}
function selectPixel(){
    formActive = "Pixel";
    //deslgBotao(true);
    criarPixel(0,0,1);
    attStatus();
}
function selectTriangulo(){
    formActive = "Triangulo";
    //deslgBotao(false);
    criarTriangulo(0,0,1);
    attStatus();
}
function selectBorracha(){
    //deslgBotao(false);
    cor = "#ffffff";
    document.getElementById("colorSelector").value = cor;
    attStatus();
}
function selectSelCor(){
    formActive = "SelCor";
    //deslgBotao(false);
    attStatus();
}