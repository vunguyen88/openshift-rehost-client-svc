# Use the official Node.js image as base
FROM node:latest AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vite app for production
RUN npm run build

# Use a lightweight Node.js image for production
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/dist ./dist

# Expose the port that your Vite app will run on
EXPOSE 3000

# Command to run the built Vite app
CMD ["npx", "serve", "dist"]
