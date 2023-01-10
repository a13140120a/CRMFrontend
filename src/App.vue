<template>
    <navbar></navbar>
    <router-view></router-view>
</template>

<script>
import { onBeforeMount } from 'vue';
import store from '@/store/index';
import Login from './views/Login.vue';
import Navbar from './views/Navbar.vue'

export default {
    components: {
        Login,
        Navbar
    },
    setup() {
        onBeforeMount(() => {
            store.commit('member/initializeStore');
            store.subscribe((mutation, state) => {
                // Store the state object as a JSON string
                console.log("init: ", JSON.stringify(state.member.user));
                localStorage.setItem('member', JSON.stringify(state.member.user));
                console.log("now :",JSON.parse(localStorage.getItem('member')));
            });
        })
    },
}
</script>


<style>
.navbar-custom {
    height: 80px;
}
</style>
