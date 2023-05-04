//variaveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis minha raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis raquete oponente
let xRaqueteOp = 585;
let yRaqueteOp = 150;
let raqueteComprimentoOp = 10;
let raqueteAlturaOp = 90;
let veloYRaqueteOp;
let chanceDeErrar = 0;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOp = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(50);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete();
  mostraRaqueteOp();
  movimentaMinhaRaquete();
  movimentaRaqueteOp();
  //verificaColisaoRaquete();
  colisaoRaqueteLib(xRaquete, yRaquete);
  colisaoRaqueteLib(xRaqueteOp, yRaqueteOp);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  
  

  
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}
  
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}  

function verificaColisaoBorda(){
   if (xBolinha > width - raio || xBolinha < 0 + raio) {
    velocidadeXBolinha *= -1;
}
  
   if (yBolinha > height - raio || yBolinha < 0 + raio) {
    velocidadeYBolinha *= -1;
  }
}
    
function mostraRaquete(){
  rect(xRaquete, yRaquete, raqueteComprimento, raqueteAltura);
} 
  
function mostraRaqueteOp(){
  rect(xRaqueteOp, yRaqueteOp, raqueteComprimentoOp, raqueteAlturaOp);
} 
   
  
function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  } 
   if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  } 
}  

function calculaChanceDeErrar() {
  if (pontosOp >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
  
function movimentaRaqueteOp(){
  veloYRaqueteOp = yBolinha - yRaqueteOp - raqueteComprimento / 2 - 30;
  yRaqueteOp += veloYRaqueteOp + chanceDeErrar
  calculaChanceDeErrar();
}
  
  
//function movimentaRaqueteOp(){
  if (keyIsDown(87)){
    yRaqueteOp -= 6;
  } 
   if (keyIsDown(83)){
    yRaqueteOp += 6;
  } 
}    

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
  
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}
   
function colisaoRaqueteLib(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 20)
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosOp, 450, 26);
}
  
function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOp += 1;
    ponto.play();
  }
}



