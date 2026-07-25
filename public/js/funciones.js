
var numJugadoresMax;
var numJugadorActual;
var numCarasDadoMax;
var numDadosMax;
var numTiradasMax;
var numTiradaJugador;
var swPoker;
var puntFinalJugadores = [];
var firmasJugadores = [];
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
	validarConfiguracion();

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
	dadosActuales = [];
	puntFinalJugadores = [];
	firmasJugadores = [];
	$("#resultados").html('');
}

function validarConfiguracion() {
	if (Number(numDadosMax) > Number(numCarasDadoMax)) {
		console.warn("Con más dados (" + numDadosMax + ") que caras (" + numCarasDadoMax + "), la Escalera nunca podrá conseguirse.");
	}
}

function inicializarPuntuaciones() {
	for (let i = 1; i <= numJugadoresMax; i++) {
		puntFinalJugadores[i] = 0;
		firmasJugadores[i] = [];
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
	$("#tablero").append('<strong class="turno-info">Jugador ' + numJugadorActual + ' - Tirada ' + numTiradaJugador + '/' + numTiradasMax + '</strong><br>');
	for (let dado = 1; dado <= numDadosMax; dado++) {
		let dadoActual = dadosActuales[dado - 1];
		let etiqueta = swPoker ? figurasPoker[dadoActual.valor] : dadoActual.valor;
		let id = dado+'_'+numTiradaJugador+'_'+numJugadorActual;
		let marcado = dadoActual.guardado ? ' checked' : '';
		$("#tablero").append('<span class="dado"><input type="checkbox" id="'+id+'" name="'+id+'" value="'+dadoActual.valor+'"'+marcado+' onchange="calcularPuntos(this)"><label for="'+id+'">'+etiqueta+'</label></span>');
	}
	$("#panelBtnFinTiradas").html('<input type="button" id="btnFinTirada" value="Finalizar Tiradas" onclick="finalizarTiradas()">');
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
	let firma = Object.keys(conteos)
		.map(Number)
		.sort((a, b) => conteos[b] - conteos[a] || b - a)
		.flatMap(v => Array(conteos[v]).fill(v));

	let mano;
	if (repeticiones[0] === valores.length) mano = { nombre: "Repóker", puntos: 8 };
	else if (repeticiones[0] === 4) mano = { nombre: "Póker", puntos: 7 };
	else if (repeticiones[0] === 3 && repeticiones[1] === 2) mano = { nombre: "Full", puntos: 6 };
	else if (esEscalera) mano = { nombre: "Escalera", puntos: 5 };
	else if (repeticiones[0] === 3) mano = { nombre: "Trío", puntos: 4 };
	else if (repeticiones[0] === 2 && repeticiones[1] === 2) mano = { nombre: "Doble Pareja", puntos: 3 };
	else if (repeticiones[0] === 2) mano = { nombre: "Pareja", puntos: 2 };
	else mano = { nombre: "Nada", puntos: 1 };

	mano.firma = firma;
	return mano;
}

function compararManos(firmaA, firmaB) {
	for (let i = 0; i < firmaA.length; i++) {
		if (firmaA[i] !== firmaB[i]) return firmaA[i] - firmaB[i];
	}
	return 0;
}

function compararJugadores(a, b) {
	if (puntFinalJugadores[a] !== puntFinalJugadores[b]) {
		return puntFinalJugadores[a] - puntFinalJugadores[b];
	}
	return compararManos(firmasJugadores[a], firmasJugadores[b]);
}

function finalizarTiradas() {
	console.log("_________________");
	console.log("Finalizar Tiradas");
	console.log("_________________");

	let valores = dadosActuales.map(d => d.valor);
	let mano = evaluarMano(valores);
	puntFinalJugadores[numJugadorActual] = mano.puntos;
	firmasJugadores[numJugadorActual] = mano.firma;
	console.log("Valores: " + valores.join(", "));
	console.log("Mano de Jugador " + numJugadorActual + ": " + mano.nombre + " (" + mano.puntos + " puntos)");
	$("#resultados").append("Jugador " + numJugadorActual + ": " + mano.nombre + " (" + mano.puntos + " puntos)<br>");

	reiniciarTablero();

	if (numJugadorActual < numJugadoresMax) {
		numJugadorActual++;
		numTiradaJugador = 0;
		console.log("Turno de Jugador " + numJugadorActual);
	} else {
		finalizarJuego();
	}
}

function mostrarGanador() {
	let ganadores = [1];
	for (let i = 2; i <= numJugadoresMax; i++) {
		let cmp = compararJugadores(i, ganadores[0]);
		if (cmp > 0) {
			ganadores = [i];
		} else if (cmp === 0) {
			ganadores.push(i);
		}
	}

	if (ganadores.length > 1) {
		console.log("Empate entre Jugadores: " + ganadores.join(", ") + " (" + puntFinalJugadores[ganadores[0]] + " puntos)");
		$("#resultados").append("<br><strong>Empate entre Jugadores " + ganadores.join(", ") + " (" + puntFinalJugadores[ganadores[0]] + " puntos)</strong><br>");
	} else {
		console.log("Ganador: Jugador " + ganadores[0] + " con " + puntFinalJugadores[ganadores[0]] + " puntos");
		$("#resultados").append("<br><strong>Ganador: Jugador " + ganadores[0] + " (" + puntFinalJugadores[ganadores[0]] + " puntos)</strong><br>");
	}
}

function finalizarJuego() {
	console.log("_______________");
	console.log("Finalizar Juego");
	console.log("_______________");
	for (let i = 1; i <= numJugadoresMax; i++) {
		console.log("Puntuación final de Jugador " + i + ": " + puntFinalJugadores[i]);
	}
	mostrarGanador();
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
	$("#panelBtnFinTiradas").html('');
	dadosActuales = [];
}