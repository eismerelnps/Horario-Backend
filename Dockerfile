# Establecer la imagen base
FROM node:lts-alpine3.18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app


# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Copiar los archivos de la aplicación al contenedor
#COPY . /app


# Exponer el puerto que utilizará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "./src/app.js"]



