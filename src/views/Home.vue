<template>
  <div id="home" class="mt-10">
    <h2 class="text-2xl mb-2">Hi, {{ fullname }}!</h2>
    <p>You've logged in using your username: {{ username }}</p>
    <button-element class="mt-10">Logout</button-element>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import ButtonElement from '../components/ButtonElement.vue';

export default defineComponent({
  components: {
    ButtonElement
  },
  setup() {
    const fullname = ref('');
    const username = ref('');

    return {
      fullname,
      username
    };
  }
});
</script>
