<template>
    <div class="container">
        <div class="col-4 offset-4">
            <form class="needs-validation" :class="{'was-validated': isValid}">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your@email.com" v-model="email" required>
                    <div class="invalid-feedback">Please enter a email.</div>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" required>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label for="exampleCheck1">Remember me</label>
                </div>
                <button type="submit" class="btn btn-primary" @click.stop.prevent="validate">Submit</button>
            </form>
        </div>
    </div>
</template>


<script>
import { defineComponent, ref, reactive, watch, onMounted, computed } from 'vue';
import { mapActions, mapMutations, useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const count = ref(0);
        const isValid = ref(false);
        const email = ref(null);
        const password = ref(null);
        const store = useStore();
        const router = useRouter();

        const doLogin = (formState) => {
            store.dispatch('http/post', {
                api: "api/admin/login",
                json: formState
            })
                .then((data) => {
                    if (Object.prototype.hasOwnProperty.call(data, "status")) {
                        console.log(data);
                        if (data.status){
                            store.commit('member/loginRequest', data)
                            router.push({ name: "Home" })  // actions
                        }else if (data.error==='5'){
                            alert('帳號或密碼錯誤');
                        }
                    } else {
                        console.log('login fail: ', data)
                        alert('發生某種錯誤');
                    }
                })
        }

        const validate = () => {
            /* some validate */
            if (email.value==null || password.value==null){
                isValid.value = true;
            }
            else {
                doLogin({
                    email: email.value,
                    password: password.value,
                });
            }

        }

        // expose to template and other options API hooks
        return {
            count,
            validate,
            isValid,
            email,
            password
        }
    },

    mounted() {
    }
}



</script>

<style scoped>
.custom-container-width {
    max-width: 500px;
}


.control-label {
    text-align: left !important;
    /* !important added for priority in SO snippet. */
}
</style>
