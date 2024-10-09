# Math-Kid

**Math-Kid** es una aplicación interactiva que permite a los usuarios practicar matemáticas a través de un juego. Cada jugador puede registrarse con sus iniciales y seleccionar un avatar. La aplicación guarda el progreso de los jugadores, incluyendo sus puntajes y puntajes más altos (top scores), para permitir la competencia entre varios jugadores.

## Características

- Registro de jugadores con iniciales y avatar.
- Soporte para múltiples usuarios, con datos almacenados en el localStorage.
- Registro de puntajes y actualización del `topScore` si el jugador mejora su puntaje anterior.
- Modo de juego interactivo con lógica para finalizar partidas y actualizar puntajes.
- Navegación intuitiva entre las secciones de la aplicación.

## Tecnologías

- **React** con Hooks y Context API para manejar el estado de la aplicación.
- **Styled-components** para el diseño y estilo de los componentes.
- **React Router** para la navegación entre la pantalla de login y la del juego.
- **LocalStorage** para el almacenamiento persistente de datos de usuarios.
