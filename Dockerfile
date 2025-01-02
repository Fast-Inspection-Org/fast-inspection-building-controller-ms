# Dockerfile
# Etapa 1: Construcción
FROM node:20.11-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el proyecto
RUN npm run build

# Etapa 2: Ejecución
FROM node:20.11-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia las dependencias instaladas y la carpeta build desde la etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expone el puerto de la aplicación
EXPOSE $PORT

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
