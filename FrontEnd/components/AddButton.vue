<template>
  <div>
    <form>
      <v-text-field
        v-model="resName"
        :error-messages="resNameErrors"
        label="Resturant Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="service"
        :error-messages="serviceErrors"
        label="Service"
        required
      ></v-text-field>
      <v-autocomplete
      return-object
        :items="delivaries"
        v-model="deliavry"
        item-text="name"
        label="Delivaries"
        multiple
      ></v-autocomplete>
      <v-btn class="mr-4 mb-4" @click="submit">Add Resturent</v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions} from 'vuex'
export default {
  name: 'AddButton',
  data() {
    return {
      resName: '',
      service: '',
      deliavry:null,
      resNameErrors: '',
      serviceErrors: '',
      delivaries: [
        {
          id: 1,
          name: 'Esraa',
          age: '25',
        },
        {
          id: 2,
          name: 'Ahmad',
          age: '24',
        },
        {
          id: 3,
          name: 'Saleh',
          age: '20',
        },
      ],
    }
  },
  methods: {
    ...mapActions(['addResturantAction']),
    submit(e) {
      try {
        e.preventDefault()
        let check = true
        if (!this.resName) {
          this.resNameErrors = 'This field is required'
          check = false
        }
        if (!this.service) {
          this.serviceErrors = 'This field is required'
          check = false
        }
        if (check) {
          const newResturant = {
            name: this.resName,
            service: this.service,
            delivaries:this.deliavry
          }
          // console.log(newResturant);
          this.addResturantAction(newResturant)
          this.resName = ''
          this.service = ''
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch:{
    // deliavry(){
    //   console.log(this.deliavry);
    // }
  }
}
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
