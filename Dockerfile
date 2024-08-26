# Use the official Node.js image as the base image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose port 3000 for the application
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/src/index.js"]

