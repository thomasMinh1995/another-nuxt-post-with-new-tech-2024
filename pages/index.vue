<template>
  <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
    <h1 class="text-4xl font-bold mb-6 text-center text-gray-900">
      Test TanStack Vue Query
    </h1>
    <Button
      label="Refetch Data"
      @click="debouncedFetchPosts"
      class="!inline-block !mb-4 !px-5 !py-2 !bg-blue-600 !text-white !rounded-lg !hover:bg-blue-700 !transition !duration-200 !shadow-md"
    />
    <p class="mt-4 text-gray-700 text-center">Total Posts: {{ totalCount }}</p>
    <NuxtLazyHydrate when-idle>
      <div v-if="isLoading" class="text-center text-gray-500 animate-pulse">
        Loading...
      </div>
      <div v-if="error" class="text-red-600 text-center font-semibold">
        Error: {{ error }}
      </div>
    </NuxtLazyHydrate>
    <NuxtLazyHydrate when-visible>
      <DataTab
        :value="posts"
        :paginator="true"
        :rows="10"
        :totalRecords="totalCount"
        :lazy="true"
        @page="debouncedOnPageChange"
        class="!mt-6 !border !border-gray-300 !rounded-lg !shadow-sm !overflow-hidden"
      >
        <Column field="title" header="Title">
          <template #body="{ data }">
            <NuxtLink
              :to="`/posts/${data.id}`"
              class="text-blue-600 hover:underline font-medium transition duration-200"
            >
              {{ data.title }}
            </NuxtLink>
          </template>
        </Column>
        <Column field="created_at" header="Created at">
          <p>{{ new Date(data.created_at).toLocaleDateString() }}</p>
        </Column>
        <Column field="created_by" header="Created by">
          <template #body="{ data }">
            <p>{{ data.created_by.first_name }} {{ data.created_by.last_name }}</p>
          </template>
        </Column>
      </DataTab le>
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <Paginator
        :first="(currentPage - 1) * 10"
        :rows="10"
        :totalRecords="totalCount"
        @page="debouncedOnPageChange"
        :template="[
          'FirstPageLink',
          'PrevPageLink',
          'PageLinks',
          'NextPageLink',
          'LastPageLink',
        ]"
        class="!text-blue-600 ! hover:text-blue-800"
      />
    </NuxtLazyHydrate>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { usePostsStore } from "@/stores/posts";
import { debounce } from "lodash";

const postsStore = usePostsStore();
let isFetching = false;

onMounted(() => {
  fetchPosts();
});

const isLoading = computed(() => postsStore.isLoading);
const error = computed(() => postsStore.error);
const posts = computed(() => postsStore.posts);
const totalCount = computed(() => postsStore.totalCount);
const currentPage = computed(() => postsStore.currentPage);

const fetchPosts = async (page = currentPage.value) => {
  if (isFetching) return;
  isFetching = true;

  try {
    await postsStore.fetchPosts(page);
  } catch (err) {
    console.error("Error fetching posts:", err);
  } finally {
    isFetching = false;
  }
};

const debouncedFetchPosts = debounce(fetchPosts, 300);

const onPageChange = (event) => {
  const newPage = event.page + 1;
  if (newPage !== currentPage.value) {
    postsStore.setCurrentPage(newPage);
    fetchPosts(newPage);
  }
};

const debouncedOnPageChange = debounce(onPageChange, 300);
</script>
