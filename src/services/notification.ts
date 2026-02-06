import { ref } from 'vue';
import { NotificationType } from '../models/enums/NotificationType';

export interface NotificationItem {
  id: number;
  type: NotificationType;
  message: string;
}

export const notifications = ref<NotificationItem[]>([]);
let nextId = 1;

export const notification = {
  show(type: NotificationType, message: string, timeout: number = 4000) {
    const id = nextId++;
    notifications.value.push({ id, type, message });
    setTimeout(() => {
      notification.close(id);
    }, timeout);
  },
  error(message: string) {
    notification.show('error', message, 6000);
  },
  success(message: string) {
    notification.show('success', message);
  },
  info(message: string) {
    notification.show('info', message);
  },
  warning(message: string) {
    notification.show('warning', message);
  },
  close(id: number) {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }
};
