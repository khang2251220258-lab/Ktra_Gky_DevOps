# Sử dụng môi trường Node.js siêu nhẹ
FROM node:18-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy 2 file package vào trước để cài thư viện
COPY package*.json ./
RUN npm install

# Copy toàn bộ code vào container
COPY . .

# Mở cổng 5000
EXPOSE 5000

# Lệnh chạy app
CMD ["node", "index.js"]