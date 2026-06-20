export default {
  methods: {
    Menu() {
      this.$router.replace('/store/menu')
    },
    Home() {
      this.$router.replace('/store')
    },
    Search() {
      this.$router.replace('/store/search')
    },
    Cart() {
      this.$router.replace('/store/cart')
    },
    Messages() {
      this.$router.replace('/store/messages')
    }
  }
}