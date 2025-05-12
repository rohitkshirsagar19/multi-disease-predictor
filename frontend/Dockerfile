# Build Stage
FROM node:18 AS builder

WORKDIR /app

# Copy and install dependencies
COPY frontend/ /app/
RUN npm install --legacy-peer-deps && npm run build

# Serve Stage
FROM nginx:alpine

# Copy build files to NGINX html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a default NGINX config if needed
# Optional: You can customize nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

