<template>
  <div>
    <h1>Test TanStack Vue Query</h1>
    <button @click="fetchPosts">Refetch Data</button>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Error: {{ error }}</div>
    <div v-if="posts.length">
      <ul>
        <li v-for="post in posts" :key="post.id">
          <NuxtLink :to="`/posts/${post.id}`">{{ post.title }}</NuxtLink>
        </li>
      </ul>
      <p>Total Posts: {{ totalCount }}</p>
      <p>Current Page: {{ currentPage }} of {{ totalPages }}</p>
      <button @click="goToPreviousPage" :disabled="currentPage === 1">Previous</button>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { usePostsStore } from '@/stores/posts';

const postsStore = usePostsStore();

// Fetch posts initially when the component mounts
onMounted(() => {
  fetchPosts();
});

// Computed properties for easier access
const isLoading = computed(() => postsStore.isLoading);
const error = computed(() => postsStore.error);
const posts = computed(() => postsStore.posts);
const totalCount = computed(() => postsStore.totalCount);
const currentPage = computed(() => postsStore.currentPage);
const totalPages = computed(() => postsStore.totalPages);

// Action to fetch posts
const fetchPosts = async () => {
  try {
    await postsStore.fetchPosts();
  } catch (err) {
    console.error('Error fetching posts:', err);
  }
};

// Functions to navigate pages
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    postsStore.setCurrentPage(currentPage.value - 1);
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    postsStore.setCurrentPage(currentPage.value + 1);
  }
};
</script>
