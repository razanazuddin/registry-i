<template>
  <div id="app" class="container mx-auto">
    <div v-if="alert.message" class="w-1/3 mx-auto mt-10">
      <alert :alert-type="alert.type">{{ alert.message }}</alert>
    </div>
    <router-view />
  </div>
</template>

<script>
import { computed, defineComponent, watch } from '@vue/composition-api';
import store from './store';
import router from './router';
import Alert from './components/Alert.vue';

export default defineComponent({
  components: { Alert },
  setup() {
    const alert = computed(() => store.state.alert);
    const clearAlert = () => {
      store.dispatch('alert/clear');
    };

    watch(
      () => router.app.$route.name,
      () => {
        clearAlert();
      }
    );

    return {
      alert
    };
  }
});
</script>
