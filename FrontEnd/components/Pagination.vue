<template>
  <div class="text-center">
    {{ page }} / {{ pages }}
    <v-pagination v-model="currentpage" :length="pages" color="deep-purple lighten-2"></v-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Pagination',
  data() {
    return {
      currentpage: 1,
    }
  },
  computed: {
    ...mapGetters({
      pages: "getpages",
      page: "getpage",
    }),
  },
  methods: {
    ...mapActions(['getResturantsAction']),
    ...mapMutations(["SET_PAGE"])
  },
  watch: {
    currentpage() {
      this.SET_PAGE(this.currentpage)
    }
  }
}
</script>
