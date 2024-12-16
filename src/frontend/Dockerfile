FROM node:18

# Configuración del directorio de trabajo
WORKDIR /app

# Copia de los archivos package.json y package-lock.json
COPY package*.json ./

# Instalación de dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Exponer el puerto utilizado por el frontend
EXPOSE 8100

# Comando de inicio
CMD ["npm", "run", "start", "--", "--host=0.0.0.0", "--port=8100"]