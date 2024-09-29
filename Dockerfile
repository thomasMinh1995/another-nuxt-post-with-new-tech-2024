# Use the official Node.js image as a base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --immutable --non-interactive --silent

COPY . .

# Build the Nuxt application
RUN yarn build

# Expose the port on which your app will run
EXPOSE 3000

# Command to run your app
CMD ["yarn", "start"]