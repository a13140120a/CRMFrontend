import axios from 'axios'
import router from '@/router'


axios.defaults.timeout = 60000;
axios.defaults.baseURL = 'http://192.168.37.129';
const $http = axios;

const state = {
}

const getters = {

}

const mutations = {
    doregister(state, payLoad) {
        state.douserlist = { ...state.douserlist, payLoad }
    }
}

const beforeApiCall = (method, api, json, ) => {
    console.log('api called');
    console.log('ip',axios.defaults.baseURL);
}

const getHttpConfig = ({ rootState }) => {
    return {
        headers: {
            Authorization: `Bearer ${rootState.member.user.token}`,
            accept: 'application/json',
        }
    };
}

const errorHandle = (commit, error) => {
    console.log("api error", error);
    error.status = parseInt(error.status);
    if (error.status == 401) {
        123
    }
    else if (error.status == 403) {
        commit('dialogBox', { dialog: true, option: { title: "權限不足", message: "你沒有權限瀏覽此內容喔!" } }, { root: true });
    }
    else if (error.status == 406 || (error.status == 400 && error.data.code == 2)) {
        commit('dialogBox', { dialog: true, option: { title: "參數錯誤", message: "Oops!你的資料可能有錯誤!請檢查後再試一次" } }, { root: true });
    }
    else if (error.status == 429) {
        commit('dialogBox', { dialog: true, option: { title: "限制請求", message: "超過API請求限制次數,請稍後再試" } }, { root: true });
        router.push({ name: 'logout' });
    } else {
        commit('dialogBox', { dialog: true, option: { title: `伺服器錯誤 ${error.status}`, message: "Oops!伺服器發生錯誤!請聯繫我們或稍後再試" } }, { root: true });
    }
    return error.data;
}

const actions = {
    post({ dispatch, commit, state, rootState }, { api, json }) {
        return new Promise((resolve, reject) => {
            beforeApiCall('post', api, json);
            $http.post(api, json, getHttpConfig({ rootState }))
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((error) => {
                    // resolve(errorHandle(commit, error.response));
                    console.log('hello:',error);
                });
        });
    },
    put({ dispatch, commit, state, rootState }, { api, json }) {
        return new Promise((resolve, reject) => {
            beforeApiCall('put', api, json);
            $http.put(api, json, getHttpConfig({ rootState }))
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((error) => {
                    resolve(errorHandle(commit, error.response));
                });
        });
    },
    get({ dispatch, commit, state, rootState }, { api }) {
        return new Promise((resolve, reject) => {
            beforeApiCall('get', api);
            $http.get(api, getHttpConfig({ rootState }))
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((error) => {
                    resolve(errorHandle(commit, error.response));
                });
        });
    }
}

export default {
    namespaced: true,   //(名字間隔)
    state,
    getters,
    actions,
    mutations
}
