# Poker Dice

Juego de dados de póker (Poker Dice) jugable en el navegador, desarrollado con HTML, CSS y JavaScript (jQuery), sin backend ni dependencias externas.

## Cómo jugar

1. Configura la partida: número de jugadores (1-4), número de dados (3-6), número de caras por dado (2-6), número de tiradas por turno (1-3) y si se usan símbolos de dados de póker (7, 8, J, Q, K, As) en vez de números.
2. Cada jugador, en su turno, tira los dados y puede **guardar** los que le interesen haciendo clic sobre ellos (mecánica *hold and reroll*, como en el Yahtzee): los dados guardados no se vuelven a lanzar en las siguientes tiradas del mismo turno.
3. Al terminar sus tiradas (o al agotar el máximo configurado), el jugador pulsa **Finalizar Tiradas**: se evalúa su mano y el turno pasa al siguiente jugador.
4. Cuando todos los jugadores han jugado su turno, se anuncia el ganador (o el empate) según la mejor mano conseguida.
5. En cualquier momento se puede pulsar **Finalizar Juego** para abortar la partida y volver a la configuración inicial.

## Ranking de manos

De mayor a menor puntuación:

| Puntos | Mano | Descripción |
|---|---|---|
| 8 | Repóker | Todos los dados iguales |
| 7 | Póker | Cuatro dados iguales |
| 6 | Full | Trío + pareja |
| 5 | Escalera | Todos los valores consecutivos y distintos |
| 4 | Trío | Tres dados iguales |
| 3 | Doble Pareja | Dos parejas distintas |
| 2 | Pareja | Dos dados iguales |
| 1 | Nada | Sin combinación |

Cuando dos jugadores obtienen la misma categoría de mano (por ejemplo, ambos "Pareja"), el desempate se resuelve comparando los valores reales de los dados (primero el grupo que define la mano, luego el resto de dados como *kickers*), igual que en el póker de cartas. Si todos los valores coinciden, se declara empate.

## Lógica implementada

- **Tiradas con guardado por dado**: cada dado mantiene su propio estado (valor + guardado/no guardado), de modo que solo se vuelven a lanzar los que el jugador no ha guardado.
- **Evaluación de manos genérica**: la función que detecta la mano funciona para cualquier combinación de número de dados y caras configurada, no solo para la partida clásica de 5 dados y 6 caras.
- **Rotación de turnos**: al finalizar sus tiradas, el turno pasa automáticamente al siguiente jugador hasta que todos han jugado.
- **Desempate real por valores** y detección de empates genuinos entre dos o más jugadores.
- **Validación de configuración**: si se eligen más dados que caras, se avisa (por consola) de que la Escalera será imposible de conseguir.
- Resultados de cada jugador y el ganador final se muestran en pantalla, no solo por consola.

## Requisitos

- Navegador Web [Chrome], [Firefox], [Opera], [Microsoft Edge], etc.

## Cómo ejecutarlo

Al ser una aplicación 100% estática, basta con abrir `public/index.html` en el navegador. También puede servirse con cualquier servidor estático, por ejemplo:

```bash
python -m http.server 8000 --directory public
```

y abrir `http://localhost:8000`.

## Estructura del proyecto

```
public/
├── index.html          # Estructura y controles de la interfaz
├── css/main.css        # Estilos
└── js/
    ├── jquery-1.12.4.min.js
    └── funciones.js     # Lógica del juego
```

## Licencia

Esta aplicación se ofrece bajo licencia [GPL versión 3].

[Chrome]: https://www.google.es/chrome/browser/desktop/index.html
[Firefox]: https://www.mozilla.org/es-ES/firefox/new/
[Opera]: http://www.opera.com/es
[Microsoft Edge]: https://www.microsoft.com/es-es/windows/microsoft-edge
[GPL versión 3]: https://www.gnu.org/licenses/gpl-3.0.en.html
