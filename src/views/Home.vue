<template>
    <Sidebar></Sidebar>

      
</template>

<script>
// @ is an alias to /src

import { defineComponent, ref } from 'vue';
import Sidebar from './Sidebar.vue';
// import NoteCategory from "./NoteCategory.vue";


export default defineComponent({
    name: "Home",

    components: {
        // NoteCategory,
        Sidebar
    },
    setup() {
        return {  };
    }
});
</script>

<style scoped>

</style>
