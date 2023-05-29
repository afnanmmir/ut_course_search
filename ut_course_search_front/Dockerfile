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

COPY --from=build /app/.next /usr/share/nginx/html

# Expose port
EXPOSE 8080

CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"