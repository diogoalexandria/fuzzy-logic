var positionX = 15;
var positionY = 35;

function setup() {
    // Cria canvas   
    createCanvas(560, 560);
    ;      
}
  
function draw() {
    //
    background(0, 0, 0);
    // Arena com fundo preto e linhas branca
    fill(0, 0, 0);
    stroke(255, 255, 255);
    rect(30, 30, 500, 500);

    // Entrada
    rect(10, 30, 20, 20);
    // Saída    
    rect(530, 510, 20, 20);

    
    if (positionX < 30) {
        // Se tá dentro da área de entrada anda para direita
        xAxisMoviment();
    }
    else if (positionX + 10 < 520) {
        // Anda em diagonal
        xAxisMoviment();
        yAxisMoviment();
    }
    else if (positionX + 10 < 545 ) {
        // Se chegou a 5 pixels do final anda só a direita
        xAxisMoviment();
    }
    // xAxisMoviment();
    // yAxisMoviment();

    // Robô
    fill(100)
    rect(positionX, positionY, 10, 10);
}

function xAxisMoviment() {
    positionX = positionX + 1;
}

function yAxisMoviment() {
    positionY = positionY + 1;
}