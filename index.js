function setup() {
    // Canvas com fundo preto    
    createCanvas(560, 560);
    background(0,0,0);      
}
  
function draw() {
    // Arena com fundo preto e linhas branca
    fill(0,0,0);
    stroke(255,255,255);
    rect(30, 30, 500, 500);

    // Entrada e saída
    rect(10, 30, 20, 20);    
    rect(530, 510, 20, 20);
}