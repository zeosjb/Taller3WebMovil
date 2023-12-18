# Taller 3 - Introducción al desarrollo web móvil

## Requisitos previos

1. **Node.js:**
    #### Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu máquina.

2. **Creación de cluster de MongoDB:**
    * Dirigete hacia la página de [MongoDB](https://www.mongodb.com/es).
    * Después de iniciar sesión, crea un nuevo proyecto y un clúster en la consola de MongoDB Atlas. Sigue las instrucciones proporcionadas en el proceso de creación.
    * Configura las reglas de seguridad para permitir el acceso al clúster. Asegúrate de configurar la IP desde la que se accederá y establece las credenciales necesarias.
    * Obtén la cadena de conexión del clúster desde MongoDB Atlas. Esta cadena se utilizará en la aplicación backend para conectarse a la base de datos.



## Instalación del backend

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/zeosjb/Taller3WebMovil

2. **Navegar hacia la API:**

    ```bash
    cd backend

3. **Instalar dependencias:**

    ```bash
    npm  install

4. **Crea un archivo .env:**

    Crea un archivo .env siguiendo las indicaciones del .env.example

6. **Volver a la ruta inicial:**

    ```bash
    cd ..

## Instalación del frontend mobile

7. **Navegar hacia el frontend:**

    ```bash
    cd frontendmobile

8. **Instalar dependencias:**

    ```bash
    npm  install

9. **Dirigete hacia la carpeta src/api y cambia el valor de baseUrl**

    Cambia este valor siguiendo: http://direcciónipv4:puerto/ para conseguir el valor de la dirección ipv4 haz lo siguiente en una consola y copia el valor de la direccion ipv4:
    ```bash
    ipconfig

## Uso API

1. **Navegar hacia la API:**

    ```bash
    cd backend

2. **Para iniciar realiza:**

    ```bash
    npm start

## Uso Frontend Mobile

1. **Navegar hacia el frontend mobile:**

    ```bash
    cd frontendmobile

2. **Para iniciar realiza:**

    ```bash
    npx expo start

3. **Visualizalo desde tu dispositivo o un emulador de android**
    
    Selecciona la opción para la visualización.
