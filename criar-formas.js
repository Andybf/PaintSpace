// Autor:               Anderson Bucchianico
// Data Criação:        12/jan/2019
// Ultima modificação:  12/jan/2019
// Descrição:           Conjunto de funções para desenhar os objetos no canvas.
//                      Sem este arquivo, não será possível desenhar objetos na tela.

function criarCirculo(posX,posY,modo){
    if (formActive = "Circulo"){
        if (modo == 0) {
            //define a posição do circulo
            posX = posX - tela.offsetLeft;
            posY = posY - tela.offsetTop;
        } else {
            //limpa a pre visualização
            ctx[modo].clearRect(0, 0, canvas.width, canvas.height);
            posX = 30;
            posY = 30;
        }
        //começa o desenho
        ctx[modo].beginPath();
        ctx[modo].lineWidth = borda;
        if (borda == 0) {
            ctx[modo].strokeStyle = cor;
        } else {
            ctx[modo].strokeStyle = corBorda;
        }
        //define a forma e suas dimensões
        ctx[modo].arc(posX, posY, (tam/2), 0, 2 * Math.PI);
        //colorir objeto
        ctx[modo].fillStyle = cor;
        ctx[modo].fill();
        //terminar de desenhar objeto
        ctx[modo].stroke();
        attStatus(posX,posY);
    }
}
function criarQuadrado(posX,posY,modo){
    if (formActive = "Quadrado"){
        if (modo == 0) {
            posX = posX - tela.offsetLeft;
            posY = posY - tela.offsetTop;
        } else {
            //limpa a pre visualização
            ctx[modo].clearRect(0, 0, canvas.width, canvas.height);
        }
        ctx[modo].beginPath();
        ctx[modo].lineWidth = borda;
        if (borda == 0) {
            ctx[modo].strokeStyle = cor;
        } else {
            ctx[modo].strokeStyle = corBorda;
        }

        switch (rotacao) {
            case 0:
                ctx[modo].rect(posX,posY,tam,tam);
            break;
            case 45:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX-(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX, posY-(tam));
                ctx[modo].lineTo(posX+(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            case 90:
                ctx[modo].rect(posX,posY,tam,tam);
            break;
            case 135:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX-(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX, posY-(tam));
                ctx[modo].lineTo(posX+(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            case 180:
                ctx[modo].rect(posX,posY,tam,tam);
            break;
            case 225:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX-(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX, posY-(tam));
                ctx[modo].lineTo(posX+(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            case 270:
                ctx[modo].rect(posX,posY,tam,tam);
            break;
            case 315:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX-(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX, posY-(tam));
                ctx[modo].lineTo(posX+(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            default:
                rotacao = 0;
        }

        ctx[modo].fillStyle = cor;
        ctx[modo].fill();

        ctx[modo].stroke();
        attStatus(posX,posY);
    }
}
function criarPixel(posX,posY,modo){
    if (formActive = "Pixel"){
        if (modo == 0) {
            posX = posX - tela.offsetLeft;
            posY = posY - tela.offsetTop;
        } else {
            //limpa a pre visualização
            ctx[modo].clearRect(0, 0, canvas.width, canvas.height);
        }
        ctx[modo].beginPath();
        ctx[modo].lineWidth = borda;
        if (borda == 0) {
            ctx[modo].strokeStyle = cor;
        } else {
            ctx[modo].strokeStyle = corBorda;
        }
        ctx[modo].rect(posX,posY,1,1);

        ctx[modo].fillStyle = cor;
        ctx[modo].fill();

        ctx[modo].stroke();
        attStatus(posX,posY);
    }
}
function criarTriangulo(posX,posY,modo){
    if (formActive = "Triangulo"){
        if (modo == 0) {
            posX = posX - tela.offsetLeft;
            posY = posY - tela.offsetTop;
        } else {
            //limpa a pre visualização
            ctx[modo].clearRect(0, 0, canvas.width, canvas.height);
        }
        ctx[modo].beginPath();
        ctx[modo].lineWidth = borda;
        if (borda == 0) {
            ctx[modo].strokeStyle = cor;
        } else {
            ctx[modo].strokeStyle = corBorda;
        }
        //se o resto da divisão de borda por 2 for diferente de 0:
        //
        if (borda % 2 != 0) {
            tam +=1
        }
        //desenha o triangulo de acordo com a rotação definida pelo usuário
        switch(rotacao){
            case 0:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX-(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX+(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            case 45:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX-(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX+(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            case 90:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX+(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX+(tam/2), posY+(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            case 135:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX+(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX+(tam/2), posY+(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            case 180:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX+(tam/2), posY+(tam/2));
                ctx[modo].lineTo(posX-(tam/2), posY+(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            case 225:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX+(tam/2), posY+(tam/2));
                ctx[modo].lineTo(posX-(tam/2), posY+(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            case 270:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX-(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX-(tam/2), posY+(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            case 315:
                ctx[modo].moveTo(posX, posY);
                ctx[modo].lineTo(posX-(tam/2), posY-(tam/2));
                ctx[modo].lineTo(posX-(tam/2), posY+(tam/2));
                ctx[modo].lineTo(posX, posY);
            break;
            default:
                rotacao = 0;
        }
        if (borda % 2 != 0) {
            tam -=1
        }
        ctx[modo].fillStyle = cor;
        ctx[modo].fill();
        ctx[modo].stroke();
        attStatus(posX,posY);
    }
}