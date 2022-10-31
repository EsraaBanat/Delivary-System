<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Update Resturant Information</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Resturant Name" v-model="name" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Service" type="text" v-model="service" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-autocomplete return-object :items="drivers" v-model="delivary" item-text="name"
                                    label="Delivaries" multiple></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple lighten-2" text @click="$emit('close')">
                        Close
                    </v-btn>
                    <v-btn color="deep-purple lighten-2" text @click="updateResturant">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Dialog',
    props: {
        data() {
            return {
                updateDialogFlag: false
            }
        },
        resturant: {
            type: Object,
        },
        dialog: Boolean,
    },
    data: () => ({
        name: '',
        service: '',
        drivers: [
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
    }),
    methods: {
        ...mapActions(['updateResturantAction', 'getResturantsAction']),
        async updateResturant(e) {
            try {
                e.preventDefault()
                const updatedResturant = {
                    id: this.id,
                    name: this.name,
                    service: this.service,
                    delivaries: this.delivary,
                }
                await this.updateResturantAction(updatedResturant)
                this.$emit('close')
            } catch (error) {
                console.log(error.message);
            }
        },
    },
    mounted() {
        try {
            this.id = this.resturant.id
            this.name = this.resturant.name
            this.service = this.resturant.service
            this.delivary = this.resturant.delivaries.map(
                (ele) => {
                    console.log(ele.delivaryPerson);
                    ele.delivaryPerson
                }
            )
        } catch (error) { 
            console.log(error);
        }
    },
}
</script>
