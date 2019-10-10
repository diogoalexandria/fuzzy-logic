var board = [];
auxBoard = [];
var obstacles = [];
var linesBoard = 50;
var colsBoard = 50;

function CreateBoard(){
    var linePosition = 0;
    var colPosition = 0;
    for(var i = 0; i < 14; i++){
        do{
            linePosition = Math.round(Math.round(Math.random() * 100)/2) + Math.round(Math.round(Math.random() * 10)/2);
        } while(linePosition >= 50);
        for(var j = 0; j < 13; j++){
            do{
                colPosition = Math.round(Math.round(Math.random() * 100)/2) + Math.round(Math.round(Math.random() * 10)/2);
            } while(colPosition >= 50);
            console.log("Posição: Linha -> "+linePosition+ "  Coluna ->"+colPosition);
            if(auxBoard[linePosition,colPosition] == 'P'){
                console.log("Repetido: "+ linePosition +" e "+ colPosition);
            } else {
                auxBoard[linePosition,colPosition] = 'P';
            }
            
        }
    }

}

function CheckIfExists(){

}