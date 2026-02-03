# UmbrellaShooter

**UmbrellaShooter** es un prototipo funcional de un shooter en tercera persona (TPS) 3D ejecutándose completamente en el navegador. Este proyecto demuestra las capacidades de la web moderna para ofrecer experiencias de juego inmersivas sin necesidad de descargas nativas, utilizando el ecosistema de React y WebGL.

## 📋 Descripción del Proyecto

Este proyecto es un sandbox de un solo nivel que implementa mecánicas centrales de juego, física en tiempo real y renderizado avanzado. El objetivo es proporcionar una base sólida y performante para el desarrollo de juegos web.

## 🚀 Características Implementadas

### 🎮 Jugabilidad

* **Controlador de Personaje**: Movimiento fluido basado en físicas con soporte para caminar (WASD) y saltar.
* **Sistema de Combate**:
  * Disparo instantáneo (Hitscan) mediante Raycasting.
  * Feedback visual inmediato con rayos láser, fogonazos (muzzle flash) y marcadores de impacto.
* **Interacción con Enemigos**: Los enemigos son entidades físicas que reaccionan a los impactos y son eliminados de la escena al ser alcanzados.

### 🎨 Gráficos y Atmósfera

* **Motor 3D**: Renderizado de alta fidelidad con Three.js.
* **Iluminación Dinámica**: Sombras en tiempo real, iluminación ambiental y luces puntuales.
* **Post-procesamiento**: Pipeline de efectos cinematográficos que incluye Bloom (resplandor), Viñeteado, Ruido fílmico y Aberración Cromática.
* **Entorno**: Escenario nocturno con cielo procedural, niebla volumétrica y partículas flotantes.

### 🔊 Audio Procedural

Todo el audio es generado en tiempo real utilizando la **Web Audio API**, sin depender de archivos de sonido externos:

* Efectos de disparo láser.
* Sonidos de impacto.
* Pasos sincronizados con el movimiento.
* Efectos de salto.

## 🛠️ Stack Tecnológico

El proyecto está construido sobre una arquitectura moderna y optimizada:

* **Core**: [React 19](https://react.dev/)
* **Build Tool**: [Vite](https://vitejs.dev/) (Servidor de desarrollo ultrarrápido)
* **Lenguaje**: TypeScript / JavaScript
* **Gráficos**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
* **Físicas**: [Rapier](https://rapier.rs/) (Motor de físicas WASM) + [React Three Rapier](https://github.com/pmndrs/react-three-rapier)
* **Efectos**: [React Three Postprocessing](https://github.com/pmndrs/react-three-postprocessing)

## 🕹️ Controles

| Acción            | Tecla / Input              |
| :----------------- | :------------------------- |
| **Moverse**  | `W`, `A`, `S`, `D` |
| **Saltar**   | `Espacio`                |
| **Apuntar**  | Movimiento del Mouse       |
| **Disparar** | Clic Izquierdo             |

## 📦 Requisitos Previos

* **Node.js**: Se requiere tener instalado Node.js (versión 18 o superior recomendada).

## 📦 Instalación y Uso

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/ia-torlaschi/UmbrellaShooter.git
   cd UmbrellaShooter
   ```
2. **Instalar dependencias**:

   ```bash
   npm install
   ```
3. **Iniciar servidor de desarrollo**:

   ```bash
   npm run dev
   ```
4. **Abrir en el navegador**:
   Visita `http://localhost:5173` (o el puerto que indique la consola).

## 🔧 Solución de Problemas (Troubleshooting)

### Error: "npm: The term 'npm' is not recognized..."

Si recibes este error, Node.js no está instalado o tu sistema no puede encontrarlo. A continuación se detallan los métodos de instalación probados, desde el más sencillo hasta el más avanzado.

#### Método 1: Instalador Web (Recomendado para principiantes)

1. Ve a [nodejs.org](https://nodejs.org/).
2. Descarga la versión **LTS (Long Term Support)**.
3. Ejecuta el instalador y sigue los pasos (siguiente, siguiente...).
4. **IMPORTANTE**: Al finalizar, **reinicia tu computadora** para asegurar que todos los cambios se apliquen.

#### Método 2: Instalación vía Terminal con Winget (Recomendado si usas Windows 10/11)

El gestor de paquetes de Windows es rápido y fiable.

1. Abre PowerShell **como Administrador**.
2. Ejecuta el siguiente comando para buscar e instalar la última versión de Node.js:
   ```powershell
   winget install OpenJS.NodeJS --accept-package-agreements --accept-source-agreements
   ```
3. **Atención**: Es probable que aparezca una ventana emergente de Windows (Control de Cuentas de Usuario / UAC) pidiendo permiso para instalar. **Debes hacer clic en "Sí"**.
4. Espera a que la barra de progreso termine y diga "Instalado correctamente".
5. Cierra la terminal y abre una nueva para verificar con `node -v`.

#### Método 3: Instalación con Chocolatey (Avanzado)

Si prefieres usar Chocolatey pero tienes problemas de permisos o errores de ejecución de scripts, sigue estos pasos:

1. **Configurar Política de Ejecución**:
   Por defecto, PowerShell bloquea scripts externos. Para permitir la instalación de Chocolatey, ejecuta:

   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
   ```
2. **Instalar Chocolatey** (si no lo tienes):

   ```powershell
   powershell -c "irm https://community.chocolatey.org/install.ps1|iex"
   ```
3. **Instalar Node.js**:

   ```powershell
   choco install nodejs -y
   ```

   *Nota: Si `choco` no se reconoce inmediatamente, cierra y reabre PowerShell.*

#### Verificación Final

Sea cual sea el método, verifica siempre la instalación ejecutando:

```powershell
node -v
npm -v
```

Ambos comandos deben devolver un número de versión. Si siguen fallando, reinicia tu PC.

## 🔮 Estado Actual

El proyecto se encuentra en una fase de prototipo funcional ("Vertical Slice"). Todas las características listadas arriba están implementadas y operativas.
