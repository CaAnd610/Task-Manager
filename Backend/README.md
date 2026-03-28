# Backend - sistema de manejo de tareas

Sistema para gestionar tareas de estudiantes de manera efectiva y agradable al usuario

## Tecnologías:

- Node.js
- express
- JWT
- CORS
- bcrypt
- SQLite

## Estructura proyecto

Backend/
    - Controllers/
    - DB/
    - Middlewares/
    - Routes/
    - .env
    - app.js
    - server.js

## Autenticación

- Login con JWT(expira en 1 hora)
- Autenticación con middlewares

## Endpoints

### Auth

#### POST auth/signup
Body:
{
    "username" : "",
    "email" : "",
    "password" : ""
}
Response:
500 { error }
201 { id }

#### GET auth/login
Body:
{
    "email" : "",
    "password" : ""
}
Response:
500 { error }
404 { error : user not found}
401 { error : invalid password}
200 { message, token}

### subjects

#### POST subjects/
Body:
{
    "name" : ""
}
Response:
500 { error }
400 { error : Name is required}
400 { error : subject already exists}
201 { message, subjectId}

#### GET subjects/
Body:
{ }

Response:
500 { error }
400 { error : not user ID }
200 { subjects }

#### GET subjects/:id
Body:
{ }

Response:
500 { error }
404 { error : subject not found}
200 { subject }

#### PUT subjects/:id
Body:
{
    "name" : ""
}
Response:
500 { error }
400 { error : Name is required}
404 { error : subject not found}
400 { error : no new changes}
404 { error : no changes made}
200 { message }

### Events

#### POST events/
body
{
    "subject_id" : id,
    "title" : "",
    "event_type" : "homework / exam",
    "due_date" : "date",
    "event_status" : 0 - 1,
    "created_at" : ""
}
Response:
400 { errors in Event middleware }
500 { error }
404 { error : subject not valid }
201 { message, event_id }