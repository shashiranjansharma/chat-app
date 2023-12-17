import { reactive } from 'vue'
import { defineStore } from 'pinia'

interface NotifyItem {
    type: 'success' | 'error' | 'warning' | 'info';
    text: string;
}

export const useNotificationStore = defineStore('notification', () => {
  const items: NotifyItem[] = reactive([])
  const delay = 3000;
  function notify(item: NotifyItem){
    items.push(item);
    const k = setTimeout(() => {
       items.shift();
       clearTimeout(k);
    }, delay);
  }

  return { notify, items }
})