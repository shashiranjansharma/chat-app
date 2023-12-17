<script setup lang="ts">
import { computed } from 'vue';
import { useNotificationStore } from '@/stores/notification';
const notificationStore: any = useNotificationStore();
const notifications = computed(() => notificationStore.items);
</script>
<template>
  <div class="notification-list">
    <v-alert
      v-for="item in notifications.reverse()"
      :key="item.id"
      class="mb-2"
      transition="slide-x-reverse-transition"
      variant="tonal"
      close-label="Close Alert"
      :title="item.type"
      :text="item.text"
      :type="item.type"
    />
  </div>
</template>
<style lang="scss" scoped>
.notification-list {
  position: absolute;
  right: 0;
  z-index: 1000;
  max-width: 30%;
  top: 4rem;
}
</style>
