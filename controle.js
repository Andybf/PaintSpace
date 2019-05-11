// Autor:               Anderson Bucchianico
// Data Criação:        13/jan/2019
// Ultima modificação:  14/jan/2019
// Descrição:           Funções que controlam o tamanho, borda e rotação das formas.

//mexer com o tamanho das formas
function aumentarTamanho(){
    if(tam > 9 && tam < 4096){
        tam += 10;
        attStatus();
    }else{
        tam = 49;
        borda = 1;
    }
}
function diminuirTamanho(){
    if(tam > 10 && tam < 4097){
        tam -= 10;
        attStatus();
    } else{
        tam = 49;
        borda = 1;
    }
}

//mexer com a rotação das formas
function menosRotacao(){
    if(rotacao <= 315 && rotacao >= 0){
        rotacao -= 45;
    }
    if(rotacao < 0){
        rotacao = 315;
    }
    if (formActive == "Triangulo") {
        selectTriangulo();
    }
    if (formActive == "Quadrado") {
        selectQuadrado();
    } else {
        attStatus();
    }
}
function maisRotacao(){
    if(rotacao <= 315 && rotacao >= 0){
        rotacao += 45;
    }
    if(rotacao >= 360){
        rotacao = 0;
    }
    if (formActive == "Triangulo") {
        selectTriangulo();
    }
    if (formActive == "Quadrado") {
        selectQuadrado();
    } else {
        attStatus();
    }
}

function maisBorda() {
    if(borda >= tam-2) {
        return 0;
    } else {
        borda += 1;
        tam -= 1;
    }
    selForma();
}
function menosBorda() {
    if(borda <= 0) {
        borda = 0;
    }
    if (borda >= 1){
        borda -= 1;
        tam += 1;
    }
    selForma();
}

function ativarPainelConfig(){
    $('#painelconfig').slideDown('fast');
    $('#painelblur').slideDown('fast');
    //$( function() {
    //    $( "#painelconfig" ).draggable();
    //  } );
}

function desativarPainelConfig(){
    $('#painelconfig').slideUp('fast');
    $('#painelblur').slideUp('fast');
}