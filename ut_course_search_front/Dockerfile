# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy app source code
COPY . .

# Expose port
EXPOSE 3000

CMD [ "npm", "run", "dev" ]
