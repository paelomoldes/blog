export default {
  data() {
    return {
      post: null,
      loading: true
    };
  },
  async mounted() {
    const id = this.$route.params.id;

    // Simulate fetching post content from API
    await new Promise(res => setTimeout(res, 500)); // simulate network delay
    const content = postsContent[id];

    if (content) {
      this.post = { id, title: postsList.find(p => p.id == id).title, content };
    }

    this.loading = false;
  }
}