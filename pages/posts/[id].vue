<template>
  <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
    <div v-if="isLoading" class="text-center text-gray-500 animate-pulse">Loading...</div>
    <div v-if="error" class="text-red-600 text-center font-semibold">
      Error: {{ error.message }}
    </div>

    <div v-if="postDetail">
      <h1 class="text-3xl font-bold mb-4 text-gray-900">{{ postDetail.title }}</h1>
      <p class="text-gray-700 mb-2">
        Created by: {{ postDetail.created_by.first_name }}
        {{ postDetail.created_by.last_name }}
      </p>
      <p class="text-gray-700 mb-4">
        Created at: {{ new Date(postDetail.created_at).toLocaleDateString() }}
      </p>

      <!-- Render the body as HTML -->
      <div class="mt-4 text-gray-800" v-html="postDetail.body"></div>

      <!-- Optional avatar display -->
      <img
        v-if="postDetail.created_by.avatar"
        :src="postDetail.created_by.avatar"
        alt="Avatar"
        class="rounded-full w-12 h-12 mt-2"
      />
    </div>

    <!-- Debugging output -->
    <pre v-if="!isLoading">{{ postDetail }}</pre>
  </div>
</template>

<script setup>
import { usePostsStore } from "@/stores/posts";
import { useRoute } from "vue-router";

const route = useRoute();
const postsStore = usePostsStore();
const id = route.params.id; // Get the post ID from route parameters

// Call fetchPostDetail and destructure its return value
const { data: postDetail, isLoading, error } = postsStore.fetchPostDetail(id);

// Debugging output to verify values
console.log("Fetching post detail for ID:", id);
console.log("Post Detail:", postDetail);
</script>
