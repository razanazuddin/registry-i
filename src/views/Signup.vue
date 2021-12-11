<template>
  <div id="signup" class="w-1/3 mx-auto mt-10 p-10 border rounded-xl bg-white">
    <h2 class="mb-6 text-xl font-bold">Sign up</h2>
    <form class="flex flex-col space-y-4">
      <alert error>error</alert>
      <alert success>success</alert>
      <text-field v-model="username" label="Username" />
      <text-field v-model="fullname" label="Full name" />
      <password-field v-model="password" label="Password" />
      <button-element>Sign up</button-element>
      <p>
        Already have an account? Login
        <span class="text-sky-500"><router-link to="/login">here</router-link></span>
      </p>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import TextField from '../components/TextField.vue';
import PasswordField from '../components/PasswordField.vue';
import ButtonElement from '../components/ButtonElement.vue';
import Alert from '../components/Alert.vue';

export default defineComponent({
  components: {
    TextField,
    PasswordField,
    ButtonElement,
    Alert
  },
  setup() {
    const fullname = ref('');
    const username = ref('');
    const password = ref('');

    return {
      fullname,
      username,
      password
    };
  }
});
</script>
