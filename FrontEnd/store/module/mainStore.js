import {
  getResturants,
  addResturant,
  updateResturant,
  deleteResturant,
} from '../../static/services/resturant'
const mainStore = {
  namespace: true,
  state: {
    resturants: [],
    pages: 1,
    page: 1,
    searchObj: {
      name: '',
      date: '',
    },
  },
  actions: {
    async getResturantsAction({ commit }, data) {
      try {
        console.log('data', data)
        const response = await getResturants(data)
        commit('setResturants', response.rows)
        commit('SET_Pages', response.pages)
      } catch (error) {
        console.log(error)
      }
    },

    async addResturantAction({ state, commit }, resturantDTO) {
      try {
        // console.log('INSIDE STORE', resturantDTO)
        const response = await addResturant(resturantDTO)
        commit('setResturants', [...state.resturants, response])
      } catch (error) {
        console.log(error.message)
      }
    },

    async updateResturantAction({ state, commit }, resturantDTO) {
      try {
        const response = await updateResturant(resturantDTO)
        console.log(response.data)
        commit('updateResturants', response.data)
      } catch (error) {
        console.log(error)
      }
    },

    async deleteResturantAction({ commit }, id) {
      try {
        commit('remove', id)
        const response = await deleteResturant({ id })
      } catch (error) {
        throw error
      }
    },
  },
  mutations: {
    setResturants(state, payload) {
      return (state.resturants = payload)
    },
    updateResturants(state, payload) {
      state.resturants = state.resturants.map((rest) => {
        return rest.id === payload.id ? payload : rest
      })
    },
    remove(state, id) {
      // console.log(state.resturants);
      state.resturants = state.resturants.filter((rest) => rest.id !== id)
      // console.log(state.resturants);
    },
    SET_Pages(state, pages) {
      return (state.pages = pages)
    },
    SET_PAGE(state, payload) {
      return (state.page = payload)
    },
    SET_SEARCH(state, payload) {
      return (state.searchObj.name = payload.name)
    },
  },
  getters: {
    getResturants(state) {
      return state.resturants
    },
    getpages: (state) => state.pages,
    getpage: (state) => state.page,
    getSearch: (state) => state.searchObj,
  },
}

export default mainStore
