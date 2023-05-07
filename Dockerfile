# Define a imagem base
FROM node:18

# Cria o diretório de trabalho da aplicação
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Define a porta que a aplicação irá utilizar
EXPOSE 3000

# Inicializa a aplicação
CMD [ "npm", "start" ]
