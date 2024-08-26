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

# List contents before compilation
RUN echo "Contents before compilation:" && ls -la

# Display TypeScript version
RUN echo "TypeScript version:" && tsc --version

# Compile TypeScript to JavaScript
RUN tsc --project tsconfig.json

# List contents after compilation
RUN echo "Contents after compilation:" && ls -la

# List contents of the dist directory
RUN echo "Contents of dist directory:" && ls -la dist

# List contents of the dist/src directory (if it exists)
RUN echo "Contents of dist/src directory (if it exists):" && ls -la dist/src || echo "dist/src does not exist"

# Expose port 8080 for the application
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/src/index.js"]
