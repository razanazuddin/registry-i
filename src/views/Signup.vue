<template>
  <div id="signup" class="w-1/3 mx-auto mt-10 p-10 border rounded-xl bg-white">
    <h2 class="mb-6 text-xl font-bold">Sign up</h2>
    <form class="flex flex-col space-y-4">
      <text-field v-model="username" label="Username" required />
      <text-field v-model="fullname" label="Full name" required />
      <password-field v-model="password" label="Password" required />
      <button-element @click="validateSignup" :disabled="status.signingUp">
        {{ status.signingUp ? 'Signing up' : 'Sign up' }}
      </button-element>
      <p>
        Already have an account? Login
        <span class="text-sky-500"><router-link to="/login">here</router-link></span>
      </p>
    </form>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from '@vue/composition-api';
import store from '../store';
import TextField from '../components/TextField.vue';
import PasswordField from '../components/PasswordField.vue';
import ButtonElement from '../components/ButtonElement.vue';

export default defineComponent({
  components: {
    TextField,
    PasswordField,
    ButtonElement
  },
  setup() {
    const fullname = ref('');
    const username = ref('');
    const password = ref('');

    const status = computed(() => store.state.account.status);
    const signup = (signupDetails = { fullname, username, password }) => {
      store.dispatch('account/signup', signupDetails);
    };

    const validateSignup = () => {
      signup({
        fullname: fullname.value,
        username: username.value,
        password: password.value
      });
    };

    return {
      fullname,
      username,
      password,
      status,
      validateSignup
    };
  }
});
</script>
