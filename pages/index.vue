<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Test TanStack Vue Query</h1>
    
    <Button 
      label="Refetch Data" 
      @click="fetchPosts" 
      class="mb-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
    />
    
    <div v-if="isLoading" class="text-center text-gray-500 animate-pulse">Loading...</div>
    <div v-if="error" class="text-red-600 text-center font-semibold">Error: {{ error }}</div>

    <DataTable 
      :value="posts" 
      :paginator="true" 
      :rows="10" 
      :totalRecords="totalCount"
      :lazy="true" 
      @page="onPageChange"
      class="mt-4 border border-gray-300 rounded-lg shadow-sm"
    >
      <Column field="title" header="Title">
        <template #body="slotProps">
          <NuxtLink 
            :to="`/posts/${slotProps.data.id}`" 
            class="text-blue-600 hover:underline font-medium"
          >
            {{ slotProps.data.title }}
          </NuxtLink>
        </template>
      </Column>
    </DataTable>

    <p class="mt-4 text-gray-700 text-center">Total Posts: {{ totalCount }}</p>
    
    <Paginator 
      :first="(currentPage - 1) * 10" 
      :rows="10" 
      :totalRecords="totalCount"
      @page="onPageChange"
      :template="['FirstPageLink', 'PrevPageLink', 'PageLinks', 'NextPageLink', 'LastPageLink']"
      class="mt-6"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { usePostsStore } from '@/stores/posts';
import Paginator from 'primevue/paginator';

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

// Action to fetch posts
const fetchPosts = async () => {
  try {
    await postsStore.fetchPosts();
  } catch (err) {
    console.error('Error fetching posts:', err);
  }
};

// Handle page change event
const onPageChange = (event) => {
  const newPage = event.page + 1; // PrimeVue uses zero-based index for pages
  if (newPage !== currentPage.value) {
    postsStore.setCurrentPage(newPage);
    fetchPosts(); // Fetch new data based on the new page
  }
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>