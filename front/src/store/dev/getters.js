export default {
    getDevById: ({ devs }) => (devId) => {
        return devs[devId]
    },
    getDevsList: ({ devs }) => Object.values(devs),
    getDevs: ({ devs }) => devs
}