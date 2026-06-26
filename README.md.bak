# Sesión 5: Proyecto Integrador

## Propuesta de proyecto: Directorio de Materias y Docentes

### Descripción

Construir una aplicación web completa (backend + frontend) que permita gestionar un **directorio de materias** y los **docentes** asignados a cada una, todo dentro entornod GitHub Codespaces configurado con la plantilla correspondiente.

El proyecto demuestra en un solo sistema todo lo aprendido en el curso:

- Entorno en la nube con `devcontainer.json` personalizado
- Contenedor Docker para la base de datos
- API REST con Flask y MySQL
- Frontend (HTML+JS **o** React) que consume los servicios web
- Repositorio organizado bajo una GitHub Organization (opcional)

---

## Paso 0: configurar la organización del equipo (primeros 20 minutos)

Antes de escribir código, cada equipo configura su espacio de trabajo en GitHub. Este paso reproduce exactamente lo que un docente haría al inicio de un semestre.

### 1. Crear la organización

1. Un integrante del equipo va a [github.com](https://github.com) → foto de perfil → **Your organizations** → **New organization**.
2. Elige el plan **Free**.
3. Nombre sugerido: `equipo-01-cloudcoder` (o el que el equipo prefiera, sin espacios).
4. Ingresa un correo y haz clic en **Create organization**.
5. Invita a los demás integrantes del equipo desde **People → Invite member** usando su nombre de usuario de GitHub.

### 2. Habilitar Codespaces para la organización

> Este paso es necesario para que todos los miembros puedan lanzar Codespaces desde los repositorios de la organización, no solo desde sus repositorios personales.

1. En tu organización ve a **Settings** (engrane superior derecho).
2. En el menú lateral busca **Code, planning, and automation → Codespaces**.
3. En **"Codespaces access"** selecciona **"Allow for all members"** (o **"Allow for selected members"** si quieres control más fino).
4. Haz clic en **Save**.

> **Nota:** si tu institución tiene GitHub Education o GitHub Team, Codespaces puede estar habilitado a nivel organización sin costo adicional. Con el plan Free, cada miembro usa sus propias horas gratuitas (60 h/mes por usuario).

### 3. Crear los repositorios del proyecto desde plantilla

El equipo crea dos repositorios dentro de la organización usando las plantillas que construyeron en las sesiones anteriores.

**Repositorio backend:**

1. En la organización haz clic en **New repository**.
2. En **Repository template** selecciona `template-backend` (o la plantilla que creaste en la sesión 2).
3. Nombre: `backend-directorio`.
4. Visibilidad: **Public**.
5. Haz clic en **Create repository**.

**Repositorio frontend:**

1. Repite el proceso con **Repository template → `template-frontend`** (sesión 3) o **`template-python`** si el equipo elige HTML+JS.
2. Nombre: `frontend-directorio`.
3. Visibilidad: **Public**.
4. Haz clic en **Create repository**.

### 4. Verificar que los Codespaces funcionan

Cada integrante abre un Codespace desde **uno** de los repositorios recién creados:

1. En el repositorio haz clic en **Code → Codespaces → Create codespace on main**.
2. Verifica que el entorno se construya correctamente (sin errores en el log).
3. Confirma en el terminal que las herramientas esperadas están disponibles:

```bash
# Para el backend
python --version && docker --version

# Para el frontend HTML+JS
python --version

# Para el frontend React
node --version && npm --version
```

Si todo responde sin errores, el equipo está listo para comenzar el desarrollo.

---

## Alcance mínimo (obligatorio en 2 horas)

### Base de datos: 2 tablas

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

-- Datos iniciales
INSERT INTO materias (clave, nombre, creditos) VALUES
  ('TC1028', 'Programación en Python', 5),
  ('TC1004B', 'Implementación de IoT', 4),
  ('TC2005B', 'Construcción de Software', 5);
```

### Backend: endpoints mínimos

| Recurso | Método | Ruta | Descripción |
|---|---|---|---|
| Materias | GET | `/materias` | Listar todas |
| Materias | GET | `/materias/<id>` | Obtener una |
| Materias | POST | `/materias` | Crear |
| Materias | PUT | `/materias/<id>` | Actualizar |
| Materias | DELETE | `/materias/<id>` | Eliminar |
| Docentes | GET | `/docentes` | Listar todos |
| Docentes | POST | `/docentes` | Crear |
| Docentes | DELETE | `/docentes/<id>` | Eliminar |

### Frontend: pantallas mínimas

El equipo elige **una** de las dos opciones:

**Opción A: HTML + JavaScript puro**
- `index.html` con dos secciones (`<div>`) para Materias y Docentes, visibles simultáneamente o alternadas con botones.
- Llamadas al backend usando `fetch` directamente en `<script>`.
- No requiere instalar nada; se sirve con `python -m http.server 8080` desde el Codespace.

**Opción B: React + Vite**
- Componentes `MateriaList`, `MateriaForm`, `DocenteList`, `DocenteForm`.
- Archivo `directorioService.js` con todas las llamadas HTTP.
- Navegación entre vistas con estado (`useState`) o con React Router.

En ambas opciones las pantallas mínimas son:

1. **Pantalla de Materias:** lista todas las materias en una tabla con botones de editar y eliminar; formulario para agregar.
2. **Pantalla de Docentes:** lista todos los docentes con su materia asignada; formulario para agregar.
3. **Navegación** entre las dos secciones (puede ser tan simple como dos `<section>` visibles en la misma página).

---

## Extensiones opcionales (si el tiempo lo permite)

- Filtrar docentes por materia (dropdown en el frontend).
- Mostrar el conteo de docentes por materia.
- Validación de formularios (correo con formato válido, campos obligatorios).
- Estilos con CSS o Tailwind.

---

## Estructura de repositorios sugerida

### Si el frontend es HTML + JS

```
equipo-01/
├── backend-directorio      ← Flask + MySQL
│   ├── .devcontainer/
│   │   └── devcontainer.json
│   ├── directorio.sql
│   ├── ws_directorio.py
│   └── README.md
└── frontend-directorio     ← HTML + JS puro
    ├── .devcontainer/
    │   └── devcontainer.json
    ├── index.html            ← Página principal con fetch
    ├── style.css             ← Estilos opcionales
    └── README.md
```

El `devcontainer.json` para HTML+JS es el más sencillo del curso, solo necesita Python para levantar el servidor estático:

```json
{
  "name": "Frontend HTML+JS",
  "image": "mcr.microsoft.com/devcontainers/python:3.12",
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "ritwickdey.LiveServer"
      ]
    }
  }
}
```

El alumno abre el Codespace y ejecuta (en el directorio donde esté index.html):

```bash
python -m http.server 8080
```

Luego abre el puerto 8080 desde la pestaña **Ports**.

### Si el frontend es React + Vite

```
equipo-01/
├── backend-directorio      ← Flask + MySQL
│   ├── .devcontainer/
│   │   └── devcontainer.json
│   ├── directorio.sql
│   ├── ws_directorio.py
│   └── README.md
└── frontend-directorio     ← React + Vite
    ├── .devcontainer/
    │   └── devcontainer.json
    ├── src/
    │   ├── services/
    │   │   └── directorioService.js
    │   ├── components/
    │   └── App.jsx
    └── README.md
```

---

## Criterios de evaluación

| Criterio | Puntos |
|---|---|
| `devcontainer.json` funcional | 20 |
| MySQL levantado con Docker y tabla creada desde script `.sql` | 15 |
| Al menos 5 endpoints CRUD funcionando (probados con `curl` o Postman) | 25 |
| Frontend (HTML+JS o React) conectado al backend (al menos lista + crear) | 25 |
| `README.md` con instrucciones claras para reproducir el proyecto | 15 |
| **Total** | **100** |

---

## Guía de arranque rápido para el día del proyecto

### Repositorio backend

```bash
# 1. Lanzar MySQL
docker run --name mysql-directorio \
  -e MYSQL_ROOT_PASSWORD=contrasena \
  -e MYSQL_DATABASE=directorio \
  -p 3306:3306 \
  -d mysql:latest

# Esperar ~15 segundos y crear las tablas
docker exec -i mysql-directorio mysql -u root -pcontrasena directorio < directorio.sql

# 2. Instalar dependencias
pip install mysql-connector-python flask flask-cors

# 3. Arrancar el servidor
python ws_directorio.py

# 4. Hacer el puerto 5000 público desde la pestaña Ports de VS Code
```

### Repositorio frontend: Opción A (HTML + JS)

```bash
# 1. Editar index.html y actualizar URL_BASE con la URL pública del backend

# 2. Arrancar el servidor estático
python -m http.server 8080

# 3. Abrir el puerto 8080 desde la pestaña Ports de VS Code
```

### Repositorio frontend: Opción B (React + Vite)

```bash
# 1. Crear el proyecto React (solo la primera vez)
npm create vite@latest directorio-app -- --template react
cd directorio-app
npm install

# 2. Copiar/crear los archivos src/
# 3. Actualizar URL_BASE en src/services/directorioService.js con la URL pública del backend

# 4. Arrancar el servidor de desarrollo
npm run dev

# 5. Abrir el puerto 5173 desde la pestaña Ports de VS Code
```

---

## Preguntas de reflexión para el cierre

1. ¿Qué ventaja tiene usar `devcontainer.json` en comparación con dar instrucciones de instalación manual a los alumnos?
2. ¿Cómo adaptarías las plantillas de este curso para una materia diferente (por ejemplo, una materia de ciencia de datos)?
3. ¿Qué configuraciones adicionales agregarías al `devcontainer.json` del backend para que MySQL se levante automáticamente al abrir el Codespace?

---

## Próximos pasos sugeridos

Después del curso, puedes continuar explorando:

- **`postCreateCommand`** en `devcontainer.json` para ejecutar scripts automáticamente al crear el Codespace (p.ej., instalar dependencias o levantar el contenedor Docker).
- **GitHub Actions** para CI/CD: correr pruebas automáticas cuando un alumno hace push.
- **GitHub Copilot** integrado en VS Code para asistir a los alumnos al escribir código.
- **GitHub Pages** para publicar el frontend estático de los proyectos.

---

## Ejemplo de `postCreateCommand` para automatizar el arranque

Puedes agregar esta línea al `devcontainer.json` del backend para que MySQL se levante automáticamente cada vez que se crea el Codespace:

```json
{
  "name": "Backend Flask + MySQL",
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/devcontainers/features/docker-outside-of-docker:1": {},
    "ghcr.io/devcontainers/features/python:1": { "version": "3.12" }
  },
  "postCreateCommand": "docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=contrasena -e MYSQL_DATABASE=mi_db -p 3306:3306 -d mysql:latest && sleep 15 && docker exec -i mysql-container mysql -u root -pcontrasena mi_db < esquema.sql && pip install mysql-connector-python flask flask-cors",
  "customizations": {
    "vscode": {
      "extensions": ["ms-python.python", "ms-python.pylint", "humao.rest-client"]
    }
  },
  "remoteUser": "vscode"
}
```

Con esto, tus alumnos solo necesitan abrir el Codespace y ejecutar `python ws_ejemplo.py`. Todo lo demás queda listo automáticamente.
