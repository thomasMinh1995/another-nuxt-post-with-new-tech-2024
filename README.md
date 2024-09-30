# another-nuxt-post-with-new-tech-2024

This project is created for personal use only. I'm still learning how to work with the Vue.js/Nuxt 3 ecosystem, including:

- **NuxtJS**
- **TanStack Vue Query**: Data fetching
- **Pinia**: State management
- **PrimeVue**: Base UI
- **TailwindCSS**: Styling

## Features

### 1. Home Page
- Create a home page that lists posts with pagination.
- Use TanStack Vue Query to fetch post data.
- Implement filtering of posts by authors with VueQuery.

### 2. Post Detail Page
- Develop a detailed view page for individual posts.
- Use TanStack Vue Query to fetch post details.
- Implement SEO best practices for the post detail page (e.g., meta tags for title, description, and Open Graph).

### 3. State Management
- Use Pinia to manage application state.
- Manage posts state, including current page, post data, and loading/error states.

### 4. UI/UX
- Use PrimeVue for base UI components (e.g., buttons, forms, data tables).
- Use Tailwind CSS for styling and layout:
  - Apply Tailwind utility classes to design a modern, responsive interface.
  - Ensure consistent and clean design across different screen sizes.

## API Endpoints

- **Base URL**: `https://mock-api-kglw.onrender.com`

### List Posts
- **GET**: `/posts?page=1&limit=10`
  
#### Response Headers:
- `x-current-page`
- `x-per-page`
- `x-total-count`
- `x-total-pages`

### Get Post
- **GET**: `/posts/{id}`

## How 
### PrimeVue with Tailwind CSS Setup

This guide will help you integrate PrimeVue with Tailwind CSS in your Nuxt.js project.

##### Step 1: Install Required Packages

Run the following command to add the necessary packages:

```
yarn add @primevue/nuxt-module tailwindcss-primeui @primevue/themes
```
##### Step 2: Update nuxt.config.js
Open your nuxt.config.js file and include the PrimeVue module. Set up the theme as follows:
```
modules: [
        '@primevue/nuxt-module'
    ],
    primevue: {
        options: {
            theme: {
                preset: Aura,
                options: {
                    cssLayer: false // Adjust based on your needs
                }
            }
        }
    }
```

##### Step 3: Configure Tailwind CSS
To set up Tailwind CSS to work with PrimeVue, add the plugin in your tailwind.config.js file:
```
module.exports = {
  plugins: [
    require('tailwindcss-primeui')
  ],
}
```

### Working with Docker

This guide provides steps to set up and run a Nuxt.js application using Docker.

#### Step 1: Install Docker

Make sure you have Docker installed on your machine. You can download it from the [official Docker website](https://www.docker.com/get-started).

#### Step 2: Create a Dockerfile

Create a file named `Dockerfile` in your project root with the following content:

```dockerfile
# Use the official Node.js image as a base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Nuxt application
RUN yarn build

# Expose the port on which your app will run
EXPOSE 3000

# Command to run your app
CMD ["yarn", "start"]
```
#### Step 3: Create a .dockerignore File
To prevent unnecessary files from being included in your Docker image, create a file named .dockerignore with the following content:
```
node_modules
dist
.git
.gitignore
Dockerfile
.dockerignore
```

#### Step 4: Build Your Docker Image
Open your terminal, navigate to your project directory, and run the following command to build your Docker image:
```bash
docker build -t nuxt-app .
```

#### Step 5: Run Your Docker Container
Once the image is built, you can run your container with:
```bash
docker run -p 3000:3000 nuxt-app
```

#### Troubleshooting: Lockfile Update Error
##### Error Message
If you encounter the error message:
```text
error Your lockfile needs to be updated, but yarn was run with `--frozen-lockfile`.
```

##### Understanding the Error
This error indicates a mismatch between your package.json and yarn.lock files. Here are some common causes:
Lockfile Staleness: The dependencies in package.json have changed since the last yarn install, but you are trying to install with --frozen-lockfile.
Yarn Version Changes: Starting from Yarn 2 and above, use --immutable instead of --frozen-lockfile.
Solutions

##### Update Your Lockfile
To fix the issue, update your lockfile by running:
```bash
yarn install
```
##### Use the Correct Flag
If you are using Yarn 2 or later, replace any instances of --frozen-lockfile in your scripts or Dockerfile with:
```bash
--immutable
```

##### Check for Stale Dependencies
Ensure that your local environment is synchronized with the latest dependencies by running:
```bash
yarn install
```
Commit any changes to yarn.lock.

##### Remove Conflicting Lockfiles
If both package-lock.json (from npm) and yarn.lock exist, remove package-lock.json.
Clean Cache and Reinstall
Clear Yarn's cache and reinstall dependencies:
```bash
yarn cache clean
yarn install
```

##### Verify Package Versions
Ensure all packages listed in your package.json have specified versions.
Example Dockerfile Adjustment
If you're using Docker, ensure your Dockerfile reflects these changes. Here’s an example adjustment:
```text
RUN yarn install --immutable --non-interactive --silent
```