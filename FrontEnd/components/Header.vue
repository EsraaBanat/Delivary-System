<template>
  <v-card flat tile>
    <v-toolbar color="deep-purple lighten-2" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Pick A Delivary APP</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field v-model="search.name" class="mx-4" flat hide-no-data hide-details label="Search About Resturant"
        solo-inverted clearable></v-text-field>
      <v-btn icon @click="searchAbout">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapActions,mapMutations } from 'vuex'
export default {
  name: 'Header',

  data: () => ({
    search: {
      name: '',
    },
  }),

  methods: {
    ...mapActions(['getResturantsAction']),
    ...mapMutations(["SET_SEARCH"]),
    async searchAbout() {
      try {
        this.SET_SEARCH(this.search)
        await this.getResturantsAction({
          limit: 3,
          offset: 1,
          name:this.search.name
        })
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>
