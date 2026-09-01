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
