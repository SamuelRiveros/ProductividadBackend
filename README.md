# Backend de Productividad

Bienvenido al proyecto de Productividad Back-End de Samuel Riveros Angarita

## Instalación
Para instalar las dependencias, ejecuta "**npm i**" en la consola para descargar todas las dependencias del proyecto, se recomienda ejecutar "**npm i**" por segunda vez para descartar que todas las dependencias se hayan descargado.

## .Env
Antes de ejecutar el proyecto y encender el servidor, cree un archivo .env en la raiz del proyecto, y ingrese los datos respectivos los cuales son necesarios para este, los campos están ubicados en el .env.template , se enviarán los datos por privado en la descripción del repo enviado por el servidor de discord.

## Ejecución - Encendiendo el Back-end
Después de haber descargado las dependencias, ejecute el comando "**npm run dev**" en la consola para encender el backend, si el backend se enciende correctamente, notará el mensaje " El server está corriendo en http://localhost:" y el puerto el cual haya ingresado en las variables de entorno.

Después de esto, si se conecta correctamente a la base de datos, se mostrará un mensaje el cual mostrará El día y la hora de conexión, y el mensaje " info: MongoDB Conectado: " y la dirección de la db.

Tenga en cuenta que debe conectarse a la base de datos para que el consumo de apis funcione correctamente.


## APIs

A continuación, se presenta la documentación de los endpoints de la API para la gestión de usuarios.

### 1. Usuarios

#### Crear Usuario

- **Método:** `POST`
- **Endpoint:** `/api/usuarios`
- **Descripción:** Crea un nuevo usuario.
  
#### Campos para el Body:

| Campo             | Tipo     | Descripción                  |
|-------------------|----------|------------------------------|
| `nombre`          | `string` | Nombre del usuario           |
| `apellido`        | `string` | Apellido del usuario         |
| `email`           | `email`  | Correo electrónico           |
| `contrasena` | `string` | Contraseña encriptada       |

---

#### Iniciar Sesión

- **Método:** `POST`
- **Endpoint:** `/api/usuarios/iniciarSesion`
- **Descripción:** Obtiene la información del usuario excluyendo `contrasena_hash` y el campo `fecha_de_creacion`. Retorna la fecha y hora actual del inicio de sesión.

#### Campos para el Body:

| Campo             | Tipo     | Descripción                  |
|-------------------|----------|------------------------------|
| `email`           | `email`  | Correo electrónico           |
| `contrasena`      | `string` | Contraseña                   |

#### Respuesta:

- Devuelve la información del usuario y un token de sesión.

---

#### Validar Sesión

- **Método:** `POST`
- **Endpoint:** `/api/usuarios/validarSesion`
- **Descripción:** Descifra la sesión proporcionada en el header `Authorization: Bearer <token>` y retorna la información que incluye.

#### Requerimientos:

- **Header:** 
  - `Authorization: Bearer <token>`

---

#### Obtener Todos los Usuarios

- **Método:** `GET`
- **Endpoint:** `/api/usuarios`
- **Descripción:** Obtiene todos los usuarios.

#### Respuesta:

- Retorna una lista de usuarios excluyendo `contrasena_hash`.

---

#### Obtener Usuario por ID

- **Método:** `GET`
- **Endpoint:** `/api/usuarios/{id}`
- **Descripción:** Obtiene un usuario específico por su ID.

#### Parámetros:

- `id`: ID del usuario a obtener.

---

#### Actualizar Usuario

- **Método:** `PUT`
- **Endpoint:** `/api/usuarios/{id}`
- **Descripción:** Actualiza un usuario específico por su ID.

#### Campos para el Body:

| Campo             | Tipo     | Descripción                  |
|-------------------|----------|------------------------------|
| `nombre`          | `string` | Nombre del usuario (opcional)|
| `apellido`        | `string` | Apellido del usuario (opcional)|
| `email`           | `email`  | Correo electrónico (opcional)|

#### Parámetros:

- `id`: ID del usuario a actualizar.

---

#### Eliminar Usuario

- **Método:** `DELETE`
- **Endpoint:** `/api/usuarios/{id}`
- **Descripción:** Elimina un usuario específico por su ID.

#### Parámetros:

- `id`: ID del usuario a eliminar.

---

### 2. Actividades

## APIs

A continuación, se presenta la documentación de los endpoints de la API para la gestión de actividades.

### 1. Actividades

#### Crear Actividad

- **Método:** `POST`
- **Endpoint:** `/api/actividades`
- **Descripción:** Crea una nueva actividad.

#### Campos para el Body:

| Campo               | Tipo       | Descripción                              |
|---------------------|------------|------------------------------------------|
| `titulo`            | `string`   | Título de la actividad (requerido)     |
| `descripcion`       | `string`   | Descripción de la actividad (opcional)  |
| `estado`            | `string`   | Estado de la actividad (opcional; valores: `pendiente`, `en_curso`, `completada`; por defecto: `pendiente`) |
| `prioridad`         | `string`   | Prioridad de la actividad (opcional; valores: `baja`, `media`, `alta`; por defecto: `media`) |
| `fecha_inicio`      | `date`     | Fecha de inicio (requerida)            |
| `fecha_fin`         | `date`     | Fecha de fin (opcional)                 |
| `duracion_estimada` | `number`   | Duración estimada en minutos (requerido) |
| `categoria`         | `ObjectId` | ID de la categoría (opcional)           |
| `etiquetas`         | `Array<ObjectId>` | IDs de las etiquetas (opcional)  |
| `colaboradores`     | `Array<ObjectId>` | IDs de los colaboradores (opcional) |

---

#### Obtener Todas las Actividades

- **Método:** `GET`
- **Endpoint:** `/api/actividades`
- **Descripción:** Obtiene todas las actividades del usuario autenticado.

#### Respuesta:

- Retorna una lista de actividades del usuario.

---

#### Obtener Actividad por ID

- **Método:** `GET`
- **Endpoint:** `/api/actividades/{id}`
- **Descripción:** Obtiene una actividad específica por su ID.

#### Parámetros:

- `id`: ID de la actividad a obtener.

---

#### Actualizar Actividad

- **Método:** `PUT`
- **Endpoint:** `/api/actividades/{id}`
- **Descripción:** Actualiza una actividad específica por su ID.

#### Campos para el Body:

| Campo               | Tipo       | Descripción                              |
|---------------------|------------|------------------------------------------|
| `titulo`            | `string`   | Título de la actividad (opcional)       |
| `descripcion`       | `string`   | Descripción de la actividad (opcional)  |
| `estado`            | `string`   | Estado de la actividad (opcional)       |
| `prioridad`         | `string`   | Prioridad de la actividad (opcional)    |
| `fecha_inicio`      | `date`     | Fecha de inicio (opcional)              |
| `fecha_fin`         | `date`     | Fecha de fin (opcional)                 |
| `duracion_estimada` | `number`   | Duración estimada en minutos (opcional) |
| `categoria`         | `ObjectId` | ID de la categoría (opcional)           |
| `etiquetas`         | `Array<ObjectId>` | IDs de las etiquetas (opcional)  |
| `colaboradores`     | `Array<ObjectId>` | IDs de los colaboradores (opcional) |

#### Parámetros:

- `id`: ID de la actividad a actualizar.

---

#### Eliminar Actividad

- **Método:** `DELETE`
- **Endpoint:** `/api/actividades/{id}`
- **Descripción:** Elimina una actividad específica por su ID.

#### Parámetros:

- `id`: ID de la actividad a eliminar.

---

### 2.Recordatorios

## APIs

A continuación, se presenta la documentación de los endpoints de la API para la gestión de recordatorios.

#### Crear Recordatorio

- **Método:** `POST`
- **Endpoint:** `/api/recordatorios`
- **Descripción:** Crea un nuevo recordatorio.

#### Campos para el Body:

| Campo         | Tipo       | Descripción                                      |
|---------------|------------|--------------------------------------------------|
| `mensaje`     | `string`   | Mensaje del recordatorio (requerido)            |
| `fecha`       | `date`     | Fecha del recordatorio (requerido)              |
| `actividadId` | `ObjectId` | ID de la actividad asociada (opcional)          |

---

#### Obtener Todos los Recordatorios

- **Método:** `GET`
- **Endpoint:** `/api/recordatorios`
- **Descripción:** Obtiene todos los recordatorios del usuario autenticado.

#### Respuesta:

- Retorna una lista de recordatorios del usuario.

---

#### Obtener Recordatorio por ID

- **Método:** `GET`
- **Endpoint:** `/api/recordatorios/{id}`
- **Descripción:** Obtiene un recordatorio específico por su ID.

#### Parámetros:

- `id`: ID del recordatorio a obtener.

---

#### Actualizar Recordatorio

- **Método:** `PUT`
- **Endpoint:** `/api/recordatorios/{id}`
- **Descripción:** Actualiza un recordatorio específico por su ID.

#### Campos para el Body:

| Campo         | Tipo       | Descripción                                      |
|---------------|------------|--------------------------------------------------|
| `mensaje`     | `string`   | Mensaje del recordatorio (opcional)              |
| `fecha`       | `date`     | Fecha del recordatorio (opcional)                |
| `actividadId` | `ObjectId` | ID de la actividad asociada (opcional)          |

#### Parámetros:

- `id`: ID del recordatorio a actualizar.

---

#### Eliminar Recordatorio

- **Método:** `DELETE`
- **Endpoint:** `/api/recordatorios/{id}`
- **Descripción:** Elimina un recordatorio específico por su ID.

#### Parámetros:

- `id`: ID del recordatorio a eliminar.

---