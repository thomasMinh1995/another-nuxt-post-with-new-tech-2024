<template>
  <div>
    <h1>Test TanStack Vue Query</h1>
    <button @click="refetch">Refetch Data</button>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-if="data">
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";

const fetcher = async () => {
  const response = await fetch('https://mock-api-kglw.onrender.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['posts'],
  queryFn: fetcher
});
</script>