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
    async fetchPosts() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(
          `https://mock-api-kglw.onrender.com/posts?page=${this.currentPage}&limit=${this.limit}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        this.posts = data;
        this.setTotalCount(parseInt(response.headers.get("x-total-count"), 10));
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchPostDetail(id) { // New action to fetch single post
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(`https://mock-api-kglw.onrender.com/posts/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        this.postDetail = await response.json();
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    setCurrentPage(page) {
      this.currentPage = page;
      this.fetchPosts(); 
    },
    setTotalCount(count) {
      this.totalCount = count;
    },
    setError(error) {
        this.error = error;
      },
  },
});
