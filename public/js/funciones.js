
var numJugadoresMax;
var numJugadorActual;
var numTurnoActual;
var numCarasDadoMax;
var numDadosMax;
var numTiradasMax;
var numTiradaJugador;
var swPoker;
var puntFinalJugadores = [];
var dadosActuales = [];
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
	numCarasDadoMax = $("#numCarasDadoMax").find(":selected").val();
	numTiradasMax = $("#numTiradasMax").find(":selected").val();
	swPoker = $("#swPoker").is(":checked");
	numTiradaJugador = 0;
	numJugadorActual = 1;
	numTurnoActual = 1;
	dadosActuales = [];
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

	if (numTiradaJugador >= numTiradasMax) {
		console.log("No quedan tiradas disponibles");
		return;
	}
	numTiradaJugador++;

	for (let dado = 1; dado <= numDadosMax; dado++) {
		if (!dadosActuales[dado - 1] || !dadosActuales[dado - 1].guardado) {
			dadosActuales[dado - 1] = { valor: Math.ceil(Math.random() * numCarasDadoMax), guardado: false };
		}
	}

	pintarTablero();
}

function pintarTablero() {
	$("#tablero").html('');
	for (let dado = 1; dado <= numDadosMax; dado++) {
		let dadoActual = dadosActuales[dado - 1];
		let etiqueta = swPoker ? figurasPoker[dadoActual.valor] : dadoActual.valor;
		let id = dado+'_'+numTiradaJugador+'_'+numJugadorActual+'_'+numTurnoActual;
		let marcado = dadoActual.guardado ? ' checked' : '';
		$("#tablero").append('<input type="checkbox" id="'+id+'" name="'+id+'" value="'+dadoActual.valor+'"'+marcado+' onchange="calcularPuntos(this)">');
		$("#tablero").append('<label for="'+id+'">'+etiqueta+'</label>');
	}
	$("#tablero").append(' <input type="button" id="btnFinTirada" value="Finalizar Tiradas" onclick="finalizarTiradas()"><br>');
}

function calcularPuntos(that) {
	console.log("_______________");
	console.log("Calcular Puntos");
	console.log("_______________");
	let dado = parseInt(that.id.split('_')[0], 10);
	dadosActuales[dado - 1].guardado = that.checked;
	console.log("Dado " + dado + (that.checked ? " guardado" : " liberado"));
}

function evaluarMano(valores) {
	let conteos = {};
	valores.forEach(v => conteos[v] = (conteos[v] || 0) + 1);
	let repeticiones = Object.values(conteos).sort((a, b) => b - a);
	let esEscalera = Object.keys(conteos).length === valores.length &&
		(Math.max(...valores) - Math.min(...valores)) === valores.length - 1;

	if (repeticiones[0] === valores.length) return { nombre: "Repóker", puntos: 8 };
	if (repeticiones[0] === 4) return { nombre: "Póker", puntos: 7 };
	if (repeticiones[0] === 3 && repeticiones[1] === 2) return { nombre: "Full", puntos: 6 };
	if (esEscalera) return { nombre: "Escalera", puntos: 5 };
	if (repeticiones[0] === 3) return { nombre: "Trío", puntos: 4 };
	if (repeticiones[0] === 2 && repeticiones[1] === 2) return { nombre: "Doble Pareja", puntos: 3 };
	if (repeticiones[0] === 2) return { nombre: "Pareja", puntos: 2 };
	return { nombre: "Nada", puntos: 1 };
}

function finalizarTiradas() {
	console.log("_________________");
	console.log("Finalizar Tiradas");
	console.log("_________________");

	let valores = dadosActuales.map(d => d.valor);
	let mano = evaluarMano(valores);
	puntFinalJugadores[numJugadorActual] = mano.puntos;
	console.log("Valores: " + valores.join(", "));
	console.log("Mano de Jugador " + numJugadorActual + ": " + mano.nombre + " (" + mano.puntos + " puntos)");

	reiniciarBotones();
	reiniciarTablero();
}

function finalizarJuego() {
	console.log("_______________");
	console.log("Finalizar Juego");
	console.log("_______________");
	for (let i = 1; i <= numJugadoresMax; i++) {
		console.log("Puntuación final de Jugador " + i + ": " + puntFinalJugadores[i]);
	}
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
	dadosActuales = [];
}