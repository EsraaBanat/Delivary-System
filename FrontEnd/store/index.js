import Vuex from 'vuex'
import mainStore from './module/mainStore'
const createStore = () => {
  return new Vuex.Store({
    modules: {
        mainStore
    },
  })
}
export default createStore
