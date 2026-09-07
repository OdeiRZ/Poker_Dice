# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [Unreleased]

### Añadido

- Desplegado en [Cloudflare Pages](https://pages.cloudflare.com):
  [poker-dice.pages.dev](https://poker-dice.pages.dev). Conectado
  directamente al repositorio de GitHub (auto-deploy en cada push a
  `main`), sin build command — el proyecto ya era 100% estático
  (`public/`), así que no hace falta ningún paso de compilación, a
  diferencia de LudoDex/MIRA MarketLens/PequeDex, que sí compilan su
  frontend antes de publicarlo. Verificado cargando la URL real tras el
  primer despliegue.
- Favicon real (SVG inline con el emoji del dado 🎲), en vez de solo
  aparecer en el texto del `<title>`.

### Cambiado

- El panel "Ver puntuación" se abre ahora debajo del bloque principal
  (configuración/partida/resultados) en vez de encima, para no empujarlo
  hacia abajo cada vez que se consulta.
- Los botones "Realizar Tirada" y "Finalizar Juego" ganan un icono (🎲 y
  🚪) con una pequeña animación al pasar el ratón o el foco (el dado
  gira, la puerta se sacude), en vez de ser solo texto plano. Se
  respeta `prefers-reduced-motion` desactivando esas animaciones.

### Corregido

- Desempate incorrecto cuando dos manos comparten categoría pero con
  formas distintas (con más de 5 dados, un trío doble o una triple
  pareja puntuaban igual que un trío o doble pareja simples, pero el
  desempate por firma podía dejar ganar a un kicker alto sobre una
  forma real más fuerte). Ahora se antepone la forma a la firma solo
  para el desempate interno — la categoría, los puntos y lo que ve el
  jugador no cambian.
- El botón "Finalizar Juego" (para abortar la partida a mitad de
  camino, como ya describe este mismo README) llamaba a la misma
  función que el final natural de la partida, así que calculaba y
  anunciaba un "ganador" con las puntuaciones parciales — incluyendo a
  0 puntos las de jugadores que todavía no habían jugado su turno. Ahora
  usa una función propia (`abortarJuego()`) que descarta la partida sin
  anunciar ningún ganador.
- "Dados de Poker" ya no se puede activar con un número de caras
  distinto de 6. Los símbolos de póker (7, 8, J, Q, K, As) son un mapeo
  fijo pensado para un dado clásico de 6 caras; con menos caras se veía
  solo un subconjunto arbitrario de esos símbolos, sin correspondencia
  con ningún dado real. Ahora la casilla se desactiva sola (y se
  desmarca) en cuanto se elige un número de caras distinto de 6, con una
  nota explicando por qué.
