import Vue from 'vue'

import Dev from '@/models/dev'

export default {
    setDevList (state, data) {
        data.forEach(dev => {
            if(!dev.linkedin.includes('https://www.linkedin.com/'))
                dev.linkedin = '/'
            Vue.set(state.devs, dev.id, new Dev(dev))
        })
    },
    restoreDevList (state) {
        Vue.set(state, 'devs', {})
    }
}