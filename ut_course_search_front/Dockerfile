# Use an official Node.js runtime as the base image
FROM node:18-alpine AS build

# Set the working directory in the container
# Create app directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy app source code
COPY . .

RUN npm run build

FROM nginx:stable-alpine

# remove existing files from nginx directory
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/out /usr/share/nginx/html

# add nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 8080

CMD CMD ["nginx", "-g", "daemon off;"]