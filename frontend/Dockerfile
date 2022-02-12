FROM node:16-alpine AS builder

WORKDIR /app

COPY . ./
RUN npm install && \
    npm run build


FROM httpd:2.4

# Allow Override and enable Mod Rewrite
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's#AllowOverride [Nn]one#AllowOverride All#' /usr/local/apache2/conf/httpd.conf

COPY --from=builder /app/build /usr/local/apache2/htdocs/
