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
    },
}
</script>


<style>
.navbar-custom {
  height: 80px;
}

</style>
