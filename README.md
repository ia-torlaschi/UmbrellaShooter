# UmbrellaShooter

**UmbrellaShooter** es un prototipo funcional de un shooter en tercera persona (TPS) 3D ejecutándose completamente en el navegador. Este proyecto demuestra las capacidades de la web moderna para ofrecer experiencias de juego inmersivas sin necesidad de descargas nativas, utilizando el ecosistema de React y WebGL.

## 📋 Descripción del Proyecto

Este proyecto es un sandbox de un solo nivel que implementa mecánicas centrales de juego, física en tiempo real y renderizado avanzado. El objetivo es proporcionar una base sólida y performante para el desarrollo de juegos web.

## 🚀 Características Implementadas

### 🎮 Jugabilidad
*   **Controlador de Personaje**: Movimiento fluido basado en físicas con soporte para caminar (WASD) y saltar.
*   **Sistema de Combate**:
    *   Disparo instantáneo (Hitscan) mediante Raycasting.
    *   Feedback visual inmediato con rayos láser, fogonazos (muzzle flash) y marcadores de impacto.
*   **Interacción con Enemigos**: Los enemigos son entidades físicas que reaccionan a los impactos y son eliminados de la escena al ser alcanzados.

### 🎨 Gráficos y Atmósfera
*   **Motor 3D**: Renderizado de alta fidelidad con Three.js.
*   **Iluminación Dinámica**: Sombras en tiempo real, iluminación ambiental y luces puntuales.
*   **Post-procesamiento**: Pipeline de efectos cinematográficos que incluye Bloom (resplandor), Viñeteado, Ruido fílmico y Aberración Cromática.
*   **Entorno**: Escenario nocturno con cielo procedural, niebla volumétrica y partículas flotantes.

### 🔊 Audio Procedural
Todo el audio es generado en tiempo real utilizando la **Web Audio API**, sin depender de archivos de sonido externos:
*   Efectos de disparo láser.
*   Sonidos de impacto.
*   Pasos sincronizados con el movimiento.
*   Efectos de salto.

## 🛠️ Stack Tecnológico

El proyecto está construido sobre una arquitectura moderna y optimizada:

*   **Core**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/) (Servidor de desarrollo ultrarrápido)
*   **Lenguaje**: TypeScript / JavaScript
*   **Gráficos**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
*   **Físicas**: [Rapier](https://rapier.rs/) (Motor de físicas WASM) + [React Three Rapier](https://github.com/pmndrs/react-three-rapier)
*   **Efectos**: [React Three Postprocessing](https://github.com/pmndrs/react-three-postprocessing)

## 🕹️ Controles

| Acción | Tecla / Input |
| :--- | :--- |
| **Moverse** | `W`, `A`, `S`, `D` |
| **Saltar** | `Espacio` |
| **Apuntar** | Movimiento del Mouse |
| **Disparar** | Clic Izquierdo |

## 📦 Instalación y Uso

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/ia-torlaschi/UmbrellaShooter.git
    cd UmbrellaShooter
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador**:
    Visita `http://localhost:5173` (o el puerto que indique la consola).

## 🔮 Estado Actual
El proyecto se encuentra en una fase de prototipo funcional ("Vertical Slice"). Todas las características listadas arriba están implementadas y operativas.
