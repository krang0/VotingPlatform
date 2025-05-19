FROM node:18

# Çalışma dizini oluştur
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kodunu kopyala
COPY . .

# Uygulama için port
EXPOSE 8000

# Uygulamayı başlat
CMD ["npm", "start"]
