<template>
  <div>
    <h1>Test TanStack Vue Query with PrimeVue DataView</h1>
    <button @click="refetch">Refetch Data</button>

    <!-- Loading Indicator -->
    <div v-if="isLoading">Loading...</div>

    <!-- Error Display -->
    <div v-if="error">Error: {{ error.message }}</div>

    <DataTable v-if="filteredPosts" :value="data" tableStyle="min-width: 50rem">
      <Column field="title" header="Title"></Column>
      <Column field="author" header="Author"></Column>
      <Column>
        <template #body="slotProps">
          <nuxt-link :to="`/posts/${slotProps.data.id}`">
            <Button label="View Details" />
          </nuxt-link>
        </template>
      </Column>
    </DataTable>
    <Paginator :rows="4" :totalRecords="data?.length" v-model:page="page" />
  </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';  // Import the Paginator component

const authorFilter = ref('');
const page = ref(1);

// Fetching function for the API data
const fetcher = async () => {
  const response = await fetch("https://mock-api-kglw.onrender.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Fetch the data using Vue Query
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["posts", page],
  queryFn: fetcher,
});

// Filter the posts based on the author filter
const filteredPosts = computed(() => {
  if (!authorFilter.value) return data;
  return data.filter(post => post.created_by && post.created_by.first_name.includes(authorFilter.value));
});
</script>

<style scoped>
.p-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>

<!-- <DataTable v-if="data" :value="data" tableStyle="min-width: 50rem">
      <Column field="id" header="ID" />
      <Column field="title" header="Title" />
      <Column field="body" header="Content" />
    </DataTable> -->
