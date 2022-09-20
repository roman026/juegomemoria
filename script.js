//inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 40;
let timerInicial = 40;
let tiempoRegresivo = null;

let winAudio = new Audio("./sound/whats.wav");
let loseAudio = new Audio("./sound/lose.wav");
let rightAudio = new Audio("./sound/right.wav");
let clickAudio = new Audio("./sound/click.wav");
let wrongAudio = new Audio("./sound/wrong.wav");

//Apuntando a documento HTML
let $mostrarMovimientos = document.getElementById("movimientos");
let $mostrarAciertos = document.getElementById("aciertos");
let $mostraTiempo = document.getElementById("t_restante");
const $btnNuevo = document.getElementById("btnNuevo");

//Generacion de los numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});

//funciones
function contarTiempo() {
  tiempoRegresivo = setInterval(() => {
    timer--;
    $mostraTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer == 0) {
      clearInterval(tiempoRegresivo);
      bloquearTarjetas();
      loseAudio.play();
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.svg" alt="">`;
    tarjetaBloqueada.disabled = true;
  }
}

//Funcion principal
function destapar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }
  tarjetasDestapadas++;

  if (tarjetasDestapadas == 1) {
    //Mostrar el primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./img/${primerResultado}.svg" alt="">`;
    clickAudio.play();
    //deshabilitar el primer boton
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    //Mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.svg" alt="">`;

    //Deshabilitar segundo boton
    tarjeta2.disabled = true;

    //Incrementar movimientos
    movimientos++;
    $mostrarMovimientos.innerHTML = `Mivimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      //Encerar contador tarjeta destapada
      tarjetasDestapadas = 0;

      // Incrementar aciertos
      aciertos++;
      $mostrarAciertos.innerHTML = `Aciertos ${aciertos}`;
      rightAudio.play();

      if (aciertos == 8) {
        winAudio.play();
        clearInterval(tiempoRegresivo);
        $mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
        $mostraTiempo.innerHTML = `Fantastico Sólo demoraste ${
          timerInicial - timer
        } segundos`;
        $mostrarMovimientos.innerHTML = `Movimientos ${movimientos}`;
      }
    } else {
      wrongAudio.play();
      //Mostrar momentaneamente valores y volver a tapar
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 500);
    }
  }
}
$btnNuevo.onclick = () => {
  location.reload();
};
