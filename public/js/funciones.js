
var numJugadoresMax;
var numJugadorActual;
var numTurnoActual;
var numCarasDadoMax;
var numDadosMax;
var numTiradasMax;
var numTiradaJugador;
var swPoker;
var puntFinalJugadores = [];
const figurasPoker = ["", "7", "8", "J", "Q", "K", "•"];

$(document).ready(function() {
	//https://programadorwebvalencia.com/sencillo-boton-on-off-html-y-css/
/*	$("#tablero").append("Comienzo de Partida<br>");
	for (let turno = 1; turno <= numCarasDadoMax; turno++) {
		$("#tablero").append("&nbsp; &nbsp; Turno " + turno + "<br>");
		for (let jugador = 1; jugador <= numJugadoresMax; jugador++) {
			$("#tablero").append("&nbsp; &nbsp; &nbsp; &nbsp; Jugador " + jugador + "<br>");
			for (let tirada = 1; tirada <= numTiradasMax; tirada++) {
				$("#tablero").append("&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Tirada " + tirada + "<br>");
				let tiradas = "";
				$("#tablero").append("&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ");
				for (let dado = 1; dado <= numDadosMax; dado++) {
					let num = Math.ceil(Math.random() * numCarasDadoMax);
					if (swPoker) {
						num = figurasPoker[num];
					}
					//tiradas += num + " ";
					$("#tablero").append('<input type="checkbox" id="'+dado+'_'+tirada+'_'+jugador+'_'+turno+'" name="'+dado+'_'+tirada+'_'+jugador+'_'+turno+'" value="'+num+'">');
					$("#tablero").append('<label for="'+dado+'_'+tirada+'_'+jugador+'_'+turno+'">'+num+'</label>');
				}
				$("#tablero").append("<br>");
			}
			$("#tablero").append("&nbsp; &nbsp; Puntuación de Jugador " + jugador + ": " + puntFinalJugadores[jugador] + "<br>");
		}
	}*/
});

function comenzarJuego() {
	console.log("_______________________");
	console.log("Inicializamos variables");
	console.log("_______________________");
	inicializarVariables();
	console.log("Jugadores: " + numJugadoresMax);
	console.log("Dados: " + numDadosMax);
	console.log("Caras de Dados: " + numCarasDadoMax);
	console.log("Tiradas: " + numTiradasMax);
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
	numJugadoresMax = $("#numJugadoresMax").find(":selected").val();
	numDadosMax = $("#numDadosMax").find(":selected").val();
	numCarasDadoMax = $("#numCarasDadoMax").find(":selected").val();
	numTiradasMax = $("#numTiradasMax").find(":selected").val();
	swPoker = $("#swPoker").is(":checked");
	numTiradaJugador = 0;
	numJugadorActual = 1;
	numTurnoActual = 1;
}

function inicializarPuntuaciones() {
	for (let i = 1; i <= numJugadoresMax; i++) {
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
	$("#panelBtnTirada").show();
	$("#panelBtnFin").show();
}

function realizarTirada() {
	console.log("_________________");
	console.log("Realizamos Tirada");
	console.log("_________________");

	numTiradaJugador++;
	if (numTiradaJugador <= numTiradasMax) {
		for (let dado = 1; dado <= numDadosMax; dado++) {
			let num = Math.ceil(Math.random() * numCarasDadoMax);
			if (swPoker) {
				num = figurasPoker[num];
			}
			$("#tablero").append('<input type="checkbox" id="'+dado+'_'+numTiradaJugador+'_'+numJugadorActual+'_'+numTurnoActual+'" name="'+dado+'_'+numTiradaJugador+'_'+numJugadorActual+'_'+numTurnoActual+'">');
			$("#tablero").append('<label for="'+dado+'_'+numTiradaJugador+'_'+numJugadorActual+'_'+numTurnoActual+'">'+num+'</label>');
		}
		$("#tablero").append('<br>');
	}
	//numJugadorActual
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
	$("#panelBtnTirada").hide();
	$("#panelBtnFin").hide();
	$("#panelJugadores").show();
	$("#panelDados").show();
	$("#panelCarasDado").show();
	$("#panelTiradas").show();
	$("#panelSwPoker").show();
	$("#panelBtnInicio").show();
}