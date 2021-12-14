<template>
  <div id="home" class="mt-10">
    <h2 class="text-2xl mb-2">Hi, {{ account.fullname }}!</h2>
    <p>You've logged in using your username: {{ account.username }}</p>
    <button-element class="mt-10" @click="logout">Logout</button-element>
  </div>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';
import store from '../store';
import ButtonElement from '../components/ButtonElement.vue';

export default defineComponent({
  components: {
    ButtonElement
  },
  setup() {
    const account = computed(() => store.state.account.user);
    const logout = () => {
      store.dispatch('account/logout');
    };

    return {
      account,
      logout
    };
  }
});
</script>
