# Sử dụng Nginx để chạy các file HTML/JS
FROM nginx:alpine

# Xóa các file mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy code html của bạn vào thư mục public của Nginx
COPY . /usr/share/nginx/html

# Mở cổng 80 (cổng mặc định của web)
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]