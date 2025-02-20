# **Creació d'una API REST per al Gestor de Reserves**

## Objectiu
Desenvolupar una API REST amb **Node.js** i **Express** per gestionar reserves amb operacions CRUD per a **usuaris**, **recursos**, **reserves** i **notificacions**.

---

## Entrega
1. **Codi del projecte**: 4 arxius `.js` i 4 `.json`.
2. **Captures de pantalla** de proves amb Postman.
3. **Documentació** breu (PDF o Markdown).

---

## Requisits Tècnics
- **Node.js** i **Express**.
- Rutes RESTful per a cada entitat.
- Respostes en **JSON**.
- Estructura modular amb controladors per entitat.

---

## Tasques
1. **Configuració inicial**: Crear el projecte i configurar el servidor amb rutes bàsiques.
2. **CRUD per entitats**:
   - **Usuaris**: Crear, llegir, actualitzar, eliminar.
   - **Recursos**: Crear, llegir, actualitzar, eliminar.
   - **Reserves**: Crear, llegir, actualitzar, eliminar.
   - **Notificacions**: Crear, llegir, actualitzar, eliminar.

---

## Estructura de Fitxers
```bash
- /controllers
  - usersController.js
  - resourcesController.js
  - reservationsController.js
  - notificationsController.js
- /models
  - users.json
  - resources.json
  - reservations.json
  - notifications.json
- /routes
  - usersRoutes.js
  - resourcesRoutes.js
  - reservationsRoutes.js
  - notificationsRoutes.js
- server.js
