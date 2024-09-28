<template>
  <div class="relative p-6 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Post Detail</h1>

    <!-- Loading Overlay -->
    <div v-if="postsStore.isLoading" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
    </div>

    <!-- Error Message -->
    <div v-if="postsStore.error" class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md mb-6" role="alert">
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline">{{ postsStore.error }}</span>
    </div>

    <!-- Post Detail -->
    <div v-if="!postsStore.isLoading && !postsStore.error && postsStore.postDetail" class="bg-white shadow-lg rounded-lg p-6">
      <NuxtLink to="/" class="inline-block mb-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md">
        Back to Posts
      </NuxtLink>
      <h2 class="text-3xl font-bold mb-4 text-gray-800">{{ postsStore.postDetail.title }}</h2>
      <div v-html="postsStore.postDetail.body" class="prose prose-blue max-w-none"></div>
    </div>
  </div>
</template>

<script setup>
import { usePostsStore } from '@/stores/posts';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const { id } = useRoute().params;
const postsStore = usePostsStore();

// Fetch post detail when the component mounts
onMounted(() => {
  const postId = id;
  postsStore.fetchPostDetail(postId);
});
</script>

<style scoped>
/* Additional styles can be added here */
</style>