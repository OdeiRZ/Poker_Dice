$(document).ready(function() {

	//definir como const?
	let puntFinalJugadores = [];
	let numJugadores = 1;
	let numCarasDado = 6;
	let swPoker = true;
	let figurasPoker = ["", "7", "8", "J", "Q", "K", "•"];
	let numDados = 5;
	let numTiradas = 3;

	//inicializamos puntuaciones de jugadores
	for (let i = 1; i <= numJugadores; i++) {
		puntFinalJugadores[i] = 0;
	}

	for (let turno = 1; turno <= numCarasDado; turno++) {
		//posibilidad de interrumpir juego?
		console.log("Turno: " + turno);
		for (let jugador = 1; jugador <= numJugadores; jugador++) {
			//posibilidad de comparar puntuaciones de jugadores
			console.log("\tJugador: " + jugador);
			for (let tirada = 1; tirada <= numTiradas; tirada++) {
				console.log("\t\tTirada: " + tirada);
				for (let dado = 1; dado <= numDados; dado++) {
					//damos por hecho que jugamos con figuras de poker
					let num = Math.ceil(Math.random() * numCarasDado);
					if (swPoker) {
						num = figurasPoker[num];
					} 
					console.log("\t\t\tDado " + dado + ": " + num);
				}
			}
			//console.log("Puntuación de Jugador " + jugador + ": " + puntFinalJugadores[jugador]);
		}
	}

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