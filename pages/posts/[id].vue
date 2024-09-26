<template>
  <div>
    <h1>Post Detail</h1>
    <div v-if="postsStore.isLoading">Loading...</div>
    <div v-if="postsStore.error">Error: {{ postsStore.error }}</div>
    <div v-if="postsStore.postDetail">
      <h2>{{ postsStore.postDetail.title }}</h2>
     <div v-html="postsStore.postDetail.body"></div>
    </div>
  </div>
</template>

<script setup>
import { usePostsStore } from '@/stores/posts';
import { onMounted } from 'vue';

const {id} = useRoute().params;
const postsStore = usePostsStore();

// Fetch post detail when the component mounts
onMounted(() => {
  const postId = id;
  postsStore.fetchPostDetail(postId);
});

// Function to go back to the posts list
</script>
