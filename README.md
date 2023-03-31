# Título del Proyecto

Ecommerce desarrollado en javascript, utilizando framework de react y nodejs para la base de datos

## Instalacion

Clonar el repositorio, instalar las dependencias y ejecutarlo a través node server.js

## Ejecutando pruebas (endpoints)

/productos

GET: '/:id?' - Permite listar todos los productos disponibles ó un producto por su id 

POST: '/' - Para incorporar productos al listado 

PUT: '/:id' - Actualiza un producto por su id 

DELETE: '/:id' - Borra un producto por su id 

/carrito

POST: '/' - Crea un carrito y devuelve su id.

DELETE: '/:id' - Vacía un carrito y lo elimina.

GET: '/:id/productos' - Permite listar todos los productos guardados en el carrito

POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto

DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto



# Autor
Miguel Cuadros.

Email: cuadros_miguel@hotmail.com
