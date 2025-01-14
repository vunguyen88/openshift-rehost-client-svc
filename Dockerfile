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

# Set environment variables based on build target
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Copy the appropriate .env file
COPY .env.${NODE_ENV} .env

# Run the appropriate Vite build command
RUN if [ "$NODE_ENV" = "development" ]; then \
    npm run build -- --mode development; \
  else \
    npm run build; \
  fi

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
