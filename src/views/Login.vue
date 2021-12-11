<template>
  <div id="login" class="w-1/3 mx-auto mt-10 p-10 border rounded-xl bg-white">
    <h2 class="mb-6 text-xl font-bold">Login</h2>
    <form class="flex flex-col space-y-4">
      <alert error>error</alert>
      <alert success>success</alert>
      <text-field v-model="username" label="Username" />
      <password-field v-model="password" label="Password" />
      <button-element>Login</button-element>
      <p>
        Not a member yet? Sign up
        <span class="text-sky-500"><router-link to="/signup">here</router-link></span>
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
    const username = ref('');
    const password = ref('');

    return {
      username,
      password
    };
  }
});
</script>
