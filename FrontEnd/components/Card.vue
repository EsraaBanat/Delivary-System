<template>

    <v-content>
      <v-container fluid grid-list-md>
        <v-card :loading="loading" class="mx-auto my-12" max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>{{ resturant.name }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">4.5 (413)</div>
            </v-row>

            <div class="my-4 text-subtitle-1">{{ resturant.service }}</div>

            <p class="font-weight-bold" v-for="(delivary, i) in resturant.delivaries" :key="i" >{{delivary.delivaryPerson.name}}</p>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <!-- <v-card-title>ID : {{ resturant.id }}</v-card-title> -->
          <v-card-actions>
            <v-btn color="deep-purple lighten-2" dark @click="updateDialogFlag=true" >
          Update
        </v-btn>

            <v-btn color="deep-purple lighten-2" text @click="deleteResturant">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
      <div v-if="updateDialogFlag">
        <Dialog :dialog="updateDialogFlag" :resturant="resturant" @close="updateDialogFlag=false" />
      </div>
    </v-content>

</template>

<script>
import Dialog from './Dialog.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Card',
  components: {
    Dialog,
  },
  props: {
    resturant: {
      type: Object,
    },
  },
  data: () => ({
    loading: false,
    selection: 1,
    updateDialogFlag:false,

  }),
  computed: {
    ...mapGetters({
      getResturants: 'getResturants',
    }),
  },
  methods: {
    ...mapActions(['getResturantsAction', 'deleteResturantAction']),
    deleteResturant() {
      try {
        this.deleteResturantAction(this.resturant.id)
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    // this.getResturantsAction()
  },
}
</script>
