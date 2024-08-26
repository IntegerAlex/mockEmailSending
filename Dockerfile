# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy the entire project into the container
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Ensure the compiled files are in the correct location
RUN ls -la /app/dist/src/

# Expose port 8080 for the application
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/src/index.js"]

