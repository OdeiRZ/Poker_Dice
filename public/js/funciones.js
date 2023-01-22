
var numJugadores;
var numCarasDado;
var numDados;
var numTiradas;
var swPoker;
var puntFinalJugadores = [];
const figurasPoker = ["", "7", "8", "J", "Q", "K", "•"];

$(document).ready(function() {
	//https://programadorwebvalencia.com/sencillo-boton-on-off-html-y-css/
/*
	var numJugadores = 1;
	var numCarasDado = 6;
	var numDados = 5;
	var numTiradas = 3;
	var swPoker = true;
	var puntFinalJugadores = [];
	const figurasPoker = ["", "7", "8", "J", "Q", "K", "•"];

	//inicializamos puntuaciones de jugadores
	for (let i = 1; i <= numJugadores; i++) {
		puntFinalJugadores[i] = 0;
	}

	$("#tablero").append("Comienzo de Partida<br>");
	for (let turno = 1; turno <= numCarasDado; turno++) {
		//posibilidad de interrumpir juego?
		$("#tablero").append("&nbsp; &nbsp; Turno " + turno + "<br>");
		for (let jugador = 1; jugador <= numJugadores; jugador++) {
			//posibilidad de comparar puntuaciones de jugadores
			$("#tablero").append("&nbsp; &nbsp; &nbsp; &nbsp; Jugador " + jugador + "<br>");
			for (let tirada = 1; tirada <= numTiradas; tirada++) {
				$("#tablero").append("&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Tirada " + tirada + "<br>");
				let tiradas = "";
				$("#tablero").append("&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ");
				for (let dado = 1; dado <= numDados; dado++) {
					//damos por hecho que jugamos con figuras de poker
					let num = Math.ceil(Math.random() * numCarasDado);
					if (swPoker) {
						num = figurasPoker[num];
					}
					//tiradas += num + " ";
					$("#tablero").append('<input type="checkbox" id="'+dado+'_'+tirada+'_'+jugador+'_'+turno+'" name="'+dado+'_'+tirada+'_'+jugador+'_'+turno+'" value="'+num+'">');
					$("#tablero").append('<label for="'+dado+'_'+tirada+'_'+jugador+'_'+turno+'">'+num+'</label>');
				}
				$("#tablero").append("<br>");
				//$("#tablero").append("&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + tiradas + "<br>");
			}
			$("#tablero").append("&nbsp; &nbsp; Puntuación de Jugador " + jugador + ": " + puntFinalJugadores[jugador] + "<br>");
		}
	}
*/
/*
	Repetimos 5 veces (1 por dado)
		Turno 1 
			Jugador 1
				Repetimos 3 veces (como máximo)
					Lanzamiento 1 
						Tiramos 5 dados
						Vemos el resultado/puntos
						Escogemos Dados para guardar
					Lanzamiento X 
						...
			Jugador X
				...
		Turno 2
			...
*/
});

function comenzarJuego() {
	console.log("_______________________");
	console.log("Inicializamos variables");
	console.log("_______________________");
	inicializarVariables();
	console.log("Jugadores: " + numJugadores);
	console.log("Dados: " + numDados);
	console.log("Caras de Dados: " + numCarasDado);
	console.log("Tiradas: " + numTiradas);
	console.log("Dados de Poker: " + ((swPoker) ? "Si" : "No"));

	console.log("__________________________");
	console.log("Inicializamos Puntuaciones");
	console.log("__________________________");
	inicializarPuntuaciones();

	console.log("_________________");
	console.log("Ocultamos Botones");
	console.log("_________________");
	ocultarBotones();

	console.log("________________");
	console.log("Comenzamos juego");
	console.log("________________");
}

function inicializarVariables() {
	numJugadores = $("#numJugadores").find(":selected").val();
	numDados = $("#numDados").find(":selected").val();
	numCarasDado = $("#numCarasDado").find(":selected").val();
	numTiradas = $("#numTiradas").find(":selected").val();
	swPoker = $("#swPoker").is(":checked");
}

function inicializarPuntuaciones() {
	for (let i = 1; i <= numJugadores; i++) {
		puntFinalJugadores[i] = 0;
		console.log("Puntuación de Jugador " + i + ": " + puntFinalJugadores[i]);
	}
}

function ocultarBotones() {
	console.log("Botones Ocultados");
	$("#panelJugadores").hide();
	$("#panelDados").hide();
	$("#panelCarasDado").hide();
	$("#panelTiradas").hide();
	$("#panelSwPoker").hide();
	$("#panelBtnInicio").hide();
	$("#panelBtnFin").show();
}

function finalizarJuego() {
	console.log("_______________");
	console.log("Finalizar Juego");
	console.log("_______________");

	console.log("_________________");
	console.log("Reiniciar Botones");
	console.log("_________________");
	reiniciarBotones();
}

function reiniciarBotones() {
	console.log("Botones Reiniciados");
	$("#panelBtnFin").hide();
	$("#panelJugadores").show();
	$("#panelDados").show();
	$("#panelCarasDado").show();
	$("#panelTiradas").show();
	$("#panelSwPoker").show();
	$("#panelBtnInicio").show();
}