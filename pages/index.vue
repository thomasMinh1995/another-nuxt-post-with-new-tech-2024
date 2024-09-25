<template>
  <div>
    <h1>Test TanStack Vue Query</h1>
    <button @click="refetch">Refetch Data</button>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-if="data">
      <pre>{{ data.posts }}</pre>
      <p>Total Posts: {{ totalCount }}</p>
      <p>Current Page: {{ currentPage }} of {{ totalPages }}</p>
      <button @click="goToPreviousPage" :disabled="currentPage === 1">Previous</button>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";

const currentPage = ref(1);
const limit = 10;
// Initialize refs for total count and pages
const totalCount = ref(0);
const totalPages = ref(0);

const fetcher = async (page) => {
  const response = await fetch(`https://mock-api-kglw.onrender.com/posts?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return {
    posts: data,
    headers: response.headers
  };
};

const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['posts', currentPage],
  queryFn: () => fetcher(currentPage.value),
  keepPreviousData: true,
});

// Watch for changes in data to update totalCount and totalPages
watch(data, (newData) => {
  if (newData) {
    totalCount.value = parseInt(newData.headers.get('x-total-count'), 10);
    totalPages.value = parseInt(newData.headers.get('x-total-pages'), 10);
  }
});

// Functions to navigate pages
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    refetch();
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    refetch();
  }
};

</script>