<template>
    <nav class="navbar navbar-dark bg-dark navbar-custom">
        <a class="navbar-brand" href="#">
          Light color background
      </a>
    </nav>
    <div style="height: 240px; text-align: center; padding-top: 80px;" >
        <p class="fs-1">Login</p>
    </div>
    <div class="container mh-100">
        <div class="row align-items-start">

            <router-view></router-view>
        </div>
     </div>
</template>

<script>
import { onBeforeMount } from 'vue';
import store from '@/store/index';
import Login from './views/Login.vue';

export default {
    components: {
        Login,
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
