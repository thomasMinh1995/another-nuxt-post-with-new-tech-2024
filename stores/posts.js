import { defineStore } from 'pinia';
import { useQuery } from '@tanstack/vue-query';

export const usePostsStore = defineStore("posts", {
  state: () => ({
    currentPage: 1,
    limit: 10,
    totalCount: 0,
    error: null,
    isLoading: false,
    posts: [],
    postDetail: null,
  }),

  getters: {
    totalPages: (state) => Math.ceil(state.totalCount / state.limit),
  },

  actions: {
    setCurrentPage(page) {
      if (this.currentPage !== page) {
        this.currentPage = page;
      }
    },

    setTotalCount(count) {
      this.totalCount = count;
    },

    setError(error) {
      this.error = error;
    },

    fetchPostDetail(id) {
      const fetcher = async () => {
        const response = await fetch(`https://mock-api-kglw.onrender.com/posts/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
      };

      // Return the query object directly
      return useQuery({
        queryKey: ['postDetail', id],
        queryFn: fetcher,
        onSuccess: (data) => {
          this.postDetail = data; // Store post detail in state
        },
        onError: (error) => {
          this.setError(error.message); // Set error in state
        },
      });
    },

    fetchPosts() {
      const fetcher = async () => {
        const response = await fetch(
          `https://mock-api-kglw.onrender.com/posts?page=${this.currentPage}&limit=${this.limit}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        
        // Set total count from headers
        this.setTotalCount(parseInt(response.headers.get("x-total-count"), 10));
        
        return data;
      };

      // Return the query object directly
      return useQuery({
        queryKey: ['posts', this.currentPage],
        queryFn: fetcher,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        onSuccess: (data) => {
          this.posts = data; // Store posts in state
        },
        onError: (error) => {
          this.setError(error.message); // Set error in state
        },
      });
    },
  },
});