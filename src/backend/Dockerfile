# Utilizar la imagen base de Node.js
FROM node:18

# Instalar las herramientas necesarias, incluyendo mysql-client
RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

# Crear el directorio de trabajo
WORKDIR /app

# Copiar las dependencias del proyecto
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando por defecto
CMD ["node", "server.js"]