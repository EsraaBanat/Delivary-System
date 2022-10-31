<template>
  <div>
    <Header  />
    <AddButton />
    <v-layout row wrap>
      <v-flex v-for="(resturant, i) in getResturants" :key="i" xs12 md6 lg3>
        <Card :resturant="resturant" />
      </v-flex>
    </v-layout>
    <Pagination />
  </div>
</template>
  
<script>
import Header from './Header.vue'
import AddButton from './AddButton.vue'
import Card from './Card.vue'
import Pagination from './Pagination.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    Header,
    AddButton,
    Card,
    Pagination,
  },
  computed: {
    ...mapGetters({
      getResturants: 'getResturants',
      pages: "getpages",
      page: "getpage",
      serachObj:"getSearch",
    }),
  },
  methods: {
    ...mapActions(['getResturantsAction']),
    getData() {
      this.getResturantsAction(
        {
          limit: 3,
          offset: this.page,
          name: this.serachObj.name ? this.serachObj.name : undefined , 
          date: this.serachObj.date ? this.serachObj.date : undefined , 
        }
      )
    }
  },
  mounted() {
    this.getData()

  },
  watch: {
    page() {
      this.getData()
    }
  }
}
</script>
  
<style lang="scss" scoped>

</style>
  