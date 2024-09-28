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