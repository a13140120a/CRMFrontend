import axios from 'axios'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        user: {
            token: null,
            id: null,
            account: null,
        },
        defaultCategoryCreateColor: ""
    },
    mutations: {
        resetState(state) {
            console.log("im calling reset!!");
            state.user.token = null;
            state.user.account = null;
            state.user.id = null;
        },
        loginRequest(state, payLoad) {   //回覆更改state
            state.user.token = payLoad.body._token;
            // axios.defaults.headers.common['Authorization'] = `Bearer ${payLoad.body._token}`;
            state.user.account = payLoad.body.account;
            state.user.id = payLoad.body.id;
        },
        doregister(state, payLoad) {
            state.douserlist = { ...state.douserlist, payLoad }
        },
        loginSuccess(state) {      //登入成功後再做...
            // state.user.token=null;
            // state.user.account=null;
        },
        setAntMobile(state, formState) {
            state.setAntMobile = formState
        },
        initializeStore(state) {
            // Check if the ID exists
            if(localStorage.getItem('member')) {
                  // Replace the state object with the stored item
              state.user = JSON.parse(localStorage.getItem('member'));
            }
    }
    },
    actions: {
        isLogin({ dispatch, commit, state }) {
            return new Promise((resolve, reject) => {
                dispatch("http/get", { api: `/api/admin/verifyToken` }, { root: true }).then((data) => {
                    console.log(data);
                    if (data.status) {
                        resolve(true);
                    } else {
                        commit('resetState');
                        resolve(false);
                    }
                });
            });
        },
    },
    getters: {}
}
