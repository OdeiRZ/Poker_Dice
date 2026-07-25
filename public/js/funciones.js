
var numJugadoresMax;
var numJugadorActual;
var numTurnoActual;
var numCarasDadoMax;
var numDadosMax;
var numDadosARelanzar;
var numTiradasMax;
var numTiradaJugador;
var swPoker;
var puntFinalJugadores = [];
const figurasPoker = ["", "7", "8", "J", "Q", "K", "•"];

$(document).ready(function() {

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
	numDadosARelanzar = numDadosMax;
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

	if (numDadosARelanzar <= 0) {
		console.log("No quedan dados por relanzar");
		return;
	}

	numTiradaJugador++;
	if (numTiradaJugador > numTiradasMax) {
		console.log("No quedan tiradas disponibles");
		return;
	}

	for (let dado = 1; dado <= numDadosARelanzar; dado++) {
		let num = Math.ceil(Math.random() * numCarasDadoMax);
		if (swPoker) {
			num = figurasPoker[num];
		}
		$("#tablero").append('<input type="checkbox" id="'+dado+'_'+numTiradaJugador+'_'+numJugadorActual+'_'+numTurnoActual+'" name="'+dado+'_'+numTiradaJugador+'_'+numJugadorActual+'_'+numTurnoActual+'" value="'+num+'" onchange="calcularPuntos(this)">');
		$("#tablero").append('<label for="'+dado+'_'+numTiradaJugador+'_'+numJugadorActual+'_'+numTurnoActual+'">'+num+'</label>');
	}
	$("#tablero").append(' <input type="button" id="btnFinTirada" value="Finalizar Tiradas" onclick="finalizarTiradas()"><br>');
}

function calcularPuntos(that) {
	console.log("_______________");
	console.log("Calcular Puntos");
	console.log("_______________");
	console.log(that);
	if (that.checked) {
		numDadosARelanzar--;
	} else {
		numDadosARelanzar++;
	}
}

function finalizarTiradas() {
	console.log("_________________");
	console.log("Finalizar Tiradas");
	console.log("_________________");
	reiniciarBotones();
	reiniciarTablero();
}

function finalizarJuego() {
	console.log("_______________");
	console.log("Finalizar Juego");
	console.log("_______________");
	reiniciarBotones();
	reiniciarTablero();
}

function reiniciarBotones() {
	console.log("_________________");
	console.log("Reiniciar Botones");
	console.log("_________________");
	$("#panelBtnTirada").hide();
	$("#panelBtnFin").hide();
	$("#panelJugadores").show();
	$("#panelDados").show();
	$("#panelCarasDado").show();
	$("#panelTiradas").show();
	$("#panelSwPoker").show();
	$("#panelBtnInicio").show();
	console.log("Botones Reiniciados"); 
}

function reiniciarTablero() {
	console.log("_________________");
	console.log("Reiniciar Tablero");
	console.log("_________________");
	$("#tablero").html('');
}