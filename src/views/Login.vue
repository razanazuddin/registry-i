<template>
  <div id="login" class="w-1/3 mx-auto mt-10 p-10 border rounded-xl bg-white">
    <h2 class="mb-6 text-xl font-bold">Login</h2>
    <form class="flex flex-col space-y-4">
      <text-field v-model="username" label="Username" />
      <password-field v-model="password" label="Password" />
      <template v-if="!status.loggingIn">
        <button-element @click="validateLogin">Login</button-element>
        <span class="text-sm text-gray-400 text-center">OR</span>
        <button-element class="flex items-center justify-center" @click="fblogin">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_5_26"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <circle cx="12" cy="12" r="12" fill="#C4C4C4" />
            </mask>
            <g mask="url(#mask0_5_26)">
              <path
                d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1Z"
                fill="white"
              />
              <path
                d="M9.93555 24C9.6594 24 9.43555 23.7761 9.43555 23.5V13.7344C9.43555 13.4582 9.21169 13.2344 8.93555 13.2344H7.94238C7.66624 13.2344 7.44238 13.0105 7.44238 12.7344V10.7637C7.44238 10.4875 7.66624 10.2637 7.94238 10.2637H8.93555C9.21169 10.2637 9.43555 10.0398 9.43555 9.76367V9.17188C9.43555 7.60612 9.89681 6.3916 10.8193 5.52832C11.7419 4.66504 13.0368 4.2334 14.7041 4.2334C15.2055 4.2334 15.747 4.29356 16.3286 4.41388C16.5535 4.46041 16.7106 4.66127 16.7115 4.89097L16.72 6.97983C16.7213 7.31375 16.3966 7.56697 16.0633 7.54583C15.9409 7.53806 15.8095 7.53418 15.6689 7.53418C14.374 7.53418 13.7266 8.09277 13.7266 9.20996V9.76367C13.7266 10.0398 13.9504 10.2637 14.2266 10.2637H15.9053C16.1814 10.2637 16.4053 10.4875 16.4053 10.7637V12.7344C16.4053 13.0105 16.1814 13.2344 15.9053 13.2344H14.2266C13.9504 13.2344 13.7266 13.4582 13.7266 13.7344V23.5C13.7266 23.7761 13.5027 24 13.2266 24H9.93555Z"
                fill="#1977F2"
              />
            </g>
          </svg>
          <span class="ml-3">Login with Facebook</span>
        </button-element>
      </template>
      <button-element v-else disabled>Logging in ...</button-element>
      <p>
        Not a member yet? Sign up
        <span class="text-sky-500"><router-link to="/signup">here</router-link></span>
      </p>
    </form>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from '@vue/composition-api';
import { userService } from '../services';
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
    const username = ref('');
    const password = ref('');

    const status = computed(() => store.state.account.status);
    const login = (loginDetails = { username, password }) => {
      store.dispatch('account/login', loginDetails);
    };

    const validateLogin = () => {
      login({
        username: username.value,
        password: password.value
      });
    };

    const fblogin = () => {
      userService.fblogin();
    };

    return {
      username,
      password,
      status,
      validateLogin,
      fblogin
    };
  }
});
</script>
