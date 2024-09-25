<template>
  <div>
    <h1>Test TanStack Vue Query</h1>
    <button @click="postsStore.fetchPosts">Refetch Data</button>
    <div v-if="postsStore.isLoading">Loading...</div>
    <div v-if="postsStore.error">Error: {{ postsStore.error }}</div>
    <div v-if="postsStore.posts.length">
      <pre>{{ postsStore.posts }}</pre>
      <p>Total Posts: {{ postsStore.totalCount }}</p>
      <p>Current Page: {{ postsStore.currentPage }} of {{ postsStore.totalPages }}</p>
      <button @click="goToPreviousPage" :disabled="postsStore.currentPage === 1">Previous</button>
      <button @click="goToNextPage" :disabled="postsStore.currentPage === postsStore.totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { usePostsStore } from '@/stores/posts';

const postsStore = usePostsStore();

// Fetch posts initially when the component mounts
postsStore.fetchPosts();

// Functions to navigate pages
const goToPreviousPage = () => {
  if (postsStore.currentPage > 1) {
    postsStore.setCurrentPage(postsStore.currentPage - 1);
  }
};

const goToNextPage = () => {
  if (postsStore.currentPage < postsStore.totalPages) {
    postsStore.setCurrentPage(postsStore.currentPage + 1);
  }
};
</script>
