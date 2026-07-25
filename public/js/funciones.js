
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
	console.group("🎲 Comenzar Juego");
	inicializarVariables();
	console.log("Configuración → Jugadores: " + numJugadoresMax + ", Dados: " + numDadosMax + ", Caras: " + numCarasDadoMax + ", Tiradas: " + numTiradasMax + ", Modo Póker: " + (swPoker ? "Sí" : "No"));
	validarConfiguracion();
	inicializarPuntuaciones();
	mostrarPantallaJuego();
	console.groupEnd();
}

function inicializarVariables() {
	numJugadoresMax = Number($("#numJugadoresMax").find(":selected").val());
	numDadosMax = Number($("#numDadosMax").find(":selected").val());
	numCarasDadoMax = Number($("#numCarasDadoMax").find(":selected").val());
	numTiradasMax = Number($("#numTiradasMax").find(":selected").val());
	swPoker = $("#swPoker").is(":checked");
	numTiradaJugador = 0;
	numJugadorActual = 1;
	dadosActuales = [];
	puntFinalJugadores = [];
	firmasJugadores = [];
	$("#resultados").html('');
}

function validarConfiguracion() {
	if (numDadosMax > numCarasDadoMax) {
		console.warn("Con más dados (" + numDadosMax + ") que caras (" + numCarasDadoMax + "), la Escalera nunca podrá conseguirse.");
	}
}

function obtenerEscalaPuntuacion() {
	let dados = Number($("#numDadosMax").find(":selected").val());
	let caras = Number($("#numCarasDadoMax").find(":selected").val());
	// "disponible" exige el minimo de dados en que la mano es distinguible de una categoria superior
	// (p.ej. con 4 dados un trio de 3 iguales + 1 kicker no cabe: los 4 iguales ya serian Repoker)
	return [
		{ puntos: 8, nombre: "Repóker", descripcion: "Todos los dados iguales", disponible: true },
		{ puntos: 7, nombre: "Póker", descripcion: "Cuatro dados iguales", disponible: dados >= 5 },
		{ puntos: 6, nombre: "Full", descripcion: "Trío + pareja", disponible: dados >= 5 },
		{ puntos: 5, nombre: "Escalera", descripcion: "Todos los valores consecutivos y distintos", disponible: dados <= caras },
		{ puntos: 4, nombre: "Trío", descripcion: "Tres dados iguales", disponible: dados >= 4 },
		{ puntos: 3, nombre: "Doble Pareja", descripcion: "Dos parejas distintas", disponible: dados >= 4 },
		{ puntos: 2, nombre: "Pareja", descripcion: "Dos dados iguales", disponible: dados >= 3 },
		{ puntos: 1, nombre: "Nada", descripcion: "Sin combinación", disponible: true }
	];
}

function mostrarEscalaPuntuacion() {
	let panel = $("#panelPuntuacion");
	if (panel.is(":visible")) {
		panel.hide();
		return;
	}

	let filas = obtenerEscalaPuntuacion().map(function(mano) {
		let claseDisponible = mano.disponible ? "" : " escala-no-disponible";
		let detalle = mano.descripcion + (mano.disponible ? "" : " — no disponible con esta configuración");
		return '<div class="resultado-fila escala-fila' + claseDisponible + '">' +
				'<span class="mano-badge mano-' + mano.puntos + '">' + mano.nombre + '</span>' +
				'<span class="mano-detalle">' + detalle + '</span>' +
				'<span class="puntos">' + mano.puntos + ' pts</span>' +
			'</div>';
	}).join('');

	panel.html('<h2>Ranking de manos</h2>' + filas).show();
}

function inicializarPuntuaciones() {
	for (let i = 1; i <= numJugadoresMax; i++) {
		puntFinalJugadores[i] = 0;
		firmasJugadores[i] = []; // sin esto, comparar a dos jugadores que aun no han jugado (ambos a 0 puntos) rompe compararManos
	}
	console.log("Puntuaciones inicializadas para " + numJugadoresMax + " jugador(es)");
}

function mostrarPantallaJuego() {
	$("#panelConfiguracion").hide();
	$("#panelJuego").show();
	$("#panelBtnTirada").show();
	$("#panelBtnFin").show();
	actualizarTurnoInfo();
}

function actualizarTurnoInfo() {
	let detalle = numTiradaJugador > 0
		? ' - Tirada ' + numTiradaJugador + '/' + numTiradasMax
		: ' - Pulsa "Realizar Tirada" para empezar';
	$("#turnoInfo").html('<strong class="turno-info">Jugador ' + numJugadorActual + detalle + '</strong>');
}

function mostrarAviso(mensaje) {
	$("#avisoJuego").html(mensaje);
}

function limpiarAviso() {
	$("#avisoJuego").html('');
}

function realizarTirada() {
	limpiarAviso();

	if (numTiradaJugador >= numTiradasMax) {
		console.log("Realizar Tirada: no quedan tiradas disponibles para el Jugador " + numJugadorActual);
		let textoTiradas = numTiradasMax === 1 ? 'tu única tirada' : 'tus ' + numTiradasMax + ' tiradas';
		mostrarAviso('⚠️ Ya has usado ' + textoTiradas + '. Pulsa "Finalizar Tiradas" para continuar.');
		return;
	}
	numTiradaJugador++;

	// solo se relanzan los dados no guardados de la tirada anterior (hold and reroll)
	for (let dado = 1; dado <= numDadosMax; dado++) {
		if (!dadosActuales[dado - 1] || !dadosActuales[dado - 1].guardado) {
			dadosActuales[dado - 1] = { valor: Math.ceil(Math.random() * numCarasDadoMax), guardado: false };
		}
	}

	console.log("Tirada " + numTiradaJugador + "/" + numTiradasMax + " de Jugador " + numJugadorActual + " → " + dadosActuales.map(d => d.valor).join(", "));
	pintarTablero();
}

function pintarTablero() {
	actualizarTurnoInfo();
	$("#tablero").html('');
	for (let dado = 1; dado <= numDadosMax; dado++) {
		let dadoActual = dadosActuales[dado - 1];
		let etiqueta = swPoker ? figurasPoker[dadoActual.valor] : dadoActual.valor;
		let id = dado+'_'+numTiradaJugador+'_'+numJugadorActual; // alternarGuardado obtiene el indice del dado del primer segmento del id
		let marcado = dadoActual.guardado ? ' checked' : '';
		let titulo = dadoActual.guardado ? 'Haz clic para relanzar este dado' : 'Haz clic para guardar este dado';
		$("#tablero").append('<span class="dado" title="'+titulo+'"><input type="checkbox" id="'+id+'" name="'+id+'" value="'+dadoActual.valor+'"'+marcado+' onchange="alternarGuardado(this)"><label for="'+id+'">'+etiqueta+'</label></span>');
	}
	$("#panelBtnFinTiradas").html('<input type="button" id="btnFinTirada" value="Finalizar Tiradas" onclick="finalizarTiradas()">');
}

function alternarGuardado(that) {
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
	// firma: valores ordenados por repeticion (el grupo que define la mano primero) y luego por valor descendente,
	// para poder comparar dos manos de la misma categoria como en el poker (trio/pareja mas alto, despues los kickers)
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
	// comparacion lexicografica: la primera posicion en que difieren decide (misma logica que un desempate por kicker)
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
	console.group("Finalizar Tiradas — Jugador " + numJugadorActual);

	let valores = dadosActuales.map(d => d.valor);
	let mano = evaluarMano(valores);
	puntFinalJugadores[numJugadorActual] = mano.puntos;
	firmasJugadores[numJugadorActual] = mano.firma;
	console.log("Dados: " + valores.join(", ") + " → " + mano.nombre + " (" + mano.puntos + " pts)");

	let etiquetasFirma = mano.firma.map(v => swPoker ? figurasPoker[v] : v).join(", ");
	$("#resultados").append(
		'<div class="resultado-jugador">' +
			'<div class="resultado-fila">' +
				'<span class="jugador-nombre">Jugador ' + numJugadorActual + '</span>' +
				'<span class="puntos">' + mano.puntos + ' pts</span>' +
			'</div>' +
			'<div class="resultado-fila">' +
				'<span class="mano-badge mano-' + mano.puntos + '">' + mano.nombre + '</span>' +
				'<span class="mano-detalle">' + etiquetasFirma + '</span>' +
			'</div>' +
		'</div>'
	);

	reiniciarTablero();

	if (numJugadorActual < numJugadoresMax) {
		numJugadorActual++;
		numTiradaJugador = 0;
		console.log("Turno de Jugador " + numJugadorActual);
		actualizarTurnoInfo();
		console.groupEnd();
	} else {
		console.groupEnd();
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
		console.log("Resultado: empate entre Jugadores " + ganadores.join(", ") + " (" + puntFinalJugadores[ganadores[0]] + " pts)");
		$("#resultados").append(
			'<div class="veredicto veredicto-empate">🤝 Empate entre Jugadores ' + ganadores.join(", ") + ' (' + puntFinalJugadores[ganadores[0]] + ' puntos)</div>'
		);
	} else {
		console.log("Resultado: gana Jugador " + ganadores[0] + " (" + puntFinalJugadores[ganadores[0]] + " pts)");
		$("#resultados").append(
			'<div class="veredicto veredicto-ganador">🏆 Ganador: Jugador ' + ganadores[0] + ' (' + puntFinalJugadores[ganadores[0]] + ' puntos)</div>'
		);
	}
}

function finalizarJuego() {
	console.group("🏁 Finalizar Juego");
	console.log("Puntuaciones finales: " + puntFinalJugadores.slice(1).map((p, i) => "Jugador " + (i + 1) + "=" + p).join(", "));
	mostrarGanador();
	mostrarPantallaConfiguracion();
	reiniciarTablero();
	console.groupEnd();
}

function mostrarPantallaConfiguracion() {
	$("#panelBtnTirada").hide();
	$("#panelBtnFin").hide();
	$("#panelJuego").hide();
	$("#panelConfiguracion").show();
}

function reiniciarTablero() {
	$("#tablero").html('');
	$("#turnoInfo").html('');
	$("#panelBtnFinTiradas").html('');
	limpiarAviso();
	dadosActuales = [];
}
