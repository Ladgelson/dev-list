import axios from 'axios'

export default {
  getDevList ({ commit }, needRestore = false) {
    axios.get('https://606888f50add490017340250.mockapi.io/api/devs')
      .then(res => {
        if (needRestore) {
          commit('restoreDevList')
        }
        commit('setDevList', res.data)
      })
      .catch(error => {
        console.error(error)
      })
  },
}