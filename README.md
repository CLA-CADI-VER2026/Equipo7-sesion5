# Proyecto Integrador: Directorio de Materias y Docentes (React + Flask + MySQL)

## Descripción del Proyecto
Este proyecto consiste en una aplicación web completa (Full-Stack) para gestionar un **Directorio de Materias** y los **Docentes** adscritos a ellas. Permite realizar operaciones CRUD completas en ambas entidades e ilustra una arquitectura desacoplada donde el frontend en React consume de forma asíncrona una API REST construida en Flask conectada a una base de datos relacional MySQL.

---

## Arquitectura del Entorno de Desarrollo
El proyecto se ejecuta en un entorno de desarrollo en la nube basado en **GitHub Codespaces**, dividido en dos repositorios independientes:


```

┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   GITHUB CODESPACES                                    │
│                                                                                        │
│  ┌──────────────────────────────┐                  ┌────────────────────────────────┐  │
│  │     backend-directorio       │                  │      frontend-directorio       │  │
│  │                              │                  │                                │  │
│  │   ┌──────────────────────┐   │    HTTP / JSON   │   ┌────────────────────────┐   │  │
│  │   │   Flask (Port 5000)  │◄──┼──────────────────┼──►│  React+Vite (Port 5173)│   │  │
│  │   └──────────┬───────────┘   │  (Puerto Público)│   └────────────────────────┘   │  │
│  │              │               │                  │                                │  │
│  │    mysql-connector-python    │                  │                                │  │
│  │              │               │                  │                                │  │
│  │   ┌──────────▼───────────┐   │                  │                                │  │
│  │   │   MySQL en Docker    │   │                  │                                │  │
│  │   │   (Contenedor :3306) │   │                  │                                │  │
│  │   └──────────────────────┘   │                  │                                │  │
│  └──────────────────────────────┘                  └────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┐

```

---

## PARTE 1: Configuración e Implementación del Backend

### 1. Requisitos de Entorno (`.devcontainer/devcontainer.json`)
Para el repositorio `backend-directorio`, utiliza la siguiente configuración para disponer de Python 3.12 y la capacidad de ejecutar contenedores Docker internos (Docker-outside-of-Docker):

```json
{
  "name": "Backend Flask + MySQL",
  "image": "[mcr.microsoft.com/devcontainers/base:ubuntu](https://mcr.microsoft.com/devcontainers/base:ubuntu)",
  "features": {
    "ghcr.io/devcontainers/features/docker-outside-of-docker:1": {},
    "ghcr.io/devcontainers/features/python:1": {
      "version": "3.12"
    }
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-python.pylint",
        "humao.rest-client"
      ]
    }
  },
  "remoteUser": "vscode"
}

```

### 2. Inicialización de la Base de Datos

Crea un archivo llamado `directorio.sql` con el esquema de tablas iniciales:

```sql
CREATE DATABASE IF NOT EXISTS directorio;
USE directorio;

CREATE TABLE materias (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  clave    VARCHAR(20) UNIQUE NOT NULL,
  nombre   VARCHAR(100) NOT NULL,
  creditos INT
);

CREATE TABLE docentes (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(100) NOT NULL,
  email      VARCHAR(100) UNIQUE NOT NULL,
  materia_id INT,
  FOREIGN KEY (materia_id) REFERENCES materias(id)
);

INSERT INTO materias (clave, nombre, creditos) VALUES
  ('TC1028', 'Programación en Python', 5),
  ('TC1004B', 'Implementación de IoT', 4),
  ('TC2005B', 'Construcción de Software', 5);

```

Ejecuta los siguientes comandos en la terminal del Codespace de backend para iniciar MySQL y cargar el esquema:

```bash
# Levantar el contenedor oficial de MySQL
docker run --name mysql-directorio \
  -e MYSQL_ROOT_PASSWORD=contrasena \
  -e MYSQL_DATABASE=directorio \
  -p 3306:3306 \
  -d mysql:latest

# Esperar 15 segundos a que el motor inicialice y migrar las tablas
sleep 15
docker exec -i mysql-directorio mysql -u root -pcontrasena directorio < directorio.sql

```

### 3. Instalación de Dependencias y Despliegue de la API

Instala los paquetes de Python necesarios:

```bash
pip install mysql-connector-python flask flask-cors

```

Ejecuta el servidor con el comando de Python en el archivo `ws_directorio.py`:

```bash
python ws_directorio.py

```

> **IMPORTANTE:** En VS Code, ve a la pestaña **Ports**, localiza el puerto **5000**, haz clic derecho y cambia su visibilidad a **Public**. Copia la URL generada (ej. `https://tu-codespace-5000.app.github.dev`).

---

## PARTE 2: Configuración e Implementación del Frontend (React)

### 1. Requisitos de Entorno (`.devcontainer/devcontainer.json`)

Para el repositorio `frontend-directorio`, la configuración de entorno debe proveer Node.js v20:

```json
{
  "name": "Frontend React + Vite",
  "image": "[mcr.microsoft.com/devcontainers/javascript-node:20](https://mcr.microsoft.com/devcontainers/javascript-node:20)",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {
      "version": "20"
    }
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "formulahendry.auto-rename-tag"
      ]
    }
  }
}

```

### 2. Creación del Proyecto de React con Vite

En la terminal de tu segundo Codespace, inicializa la estructura de React de la siguiente manera:

```bash
# Crear el andamiaje del proyecto
npm create vite@latest directorio-app -- --template react
cd directorio-app

# Instalar los paquetes base
npm install

```

### 3. Vinculación del Servicio Web

Edita el archivo de servicios dentro de la ruta `src/services/directorioServicio.js`. Configura la constante superior usando la URL pública obtenida del puerto 5000 del backend:

```javascript
// Reemplaza con tu URL pública del backend expuesto
const URL_BASE = "[https://tu-codespace-5000.app.github.dev](https://tu-codespace-5000.app.github.dev)"; 

```

### 4. Lanzamiento del Cliente Frontend

Para levantar el servidor de desarrollo en el puerto 5173, ejecuta dentro de la carpeta del proyecto:

```bash
npm run dev

```

Abre el puerto 5173 desde la barra de puertos de VS Code para interactuar con la aplicación final desde el navegador.

---

## Estructura Final de los Repositorios

```
directorio-workspace/
├── backend-directorio/
│   ├── .devcontainer/devcontainer.json
│   ├── directorio.sql
│   └── ws_directorio.py
│
└── frontend-directorio/
    ├── .devcontainer/devcontainer.json
    └── directorio-app/
        ├── src/
        │   ├── components/
        │   │   ├── DocenteForm.jsx
        │   │   ├── DocenteList.jsx
        │   │   ├── MateriaForm.jsx
        │   │   └── MateriaList.jsx
        │   ├── services/
        │   │   └── directorioServicio.js
        │   └── App.jsx
        ├── index.html
        └── package.json

```

```

```