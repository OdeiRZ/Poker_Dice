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
					//<input type='checkbox' id='dado_'+dado name='vehicle1' value='Bike'>
  					//<label for="vehicle1"> I have a bike</label>
				}
				$("#tablero").append("<br>");
				//$("#tablero").append("&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + tiradas + "<br>");
			}
			$("#tablero").append("&nbsp; &nbsp; Puntuación de Jugador " + jugador + ": " + puntFinalJugadores[jugador] + "<br>");
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