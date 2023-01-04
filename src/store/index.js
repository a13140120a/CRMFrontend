import { createStore } from 'vuex'
import http from './http'
import member from './member'

export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        http:http,
        member:member
    }
})
