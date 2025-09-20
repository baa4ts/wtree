import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

export default function useNotificationObserver() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    function redirect(notification: Notifications.Notification) {
      const data = notification.request.content.data as
        | { id?: string }
        | undefined;
      const id = data?.id;
      if (typeof id === "string") {
        setTimeout(() => {
          router.push(`/(stack)/${id}`);
        }, 1300);
      }
    }

    const response = Notifications.getLastNotificationResponse();
    if (response?.notification) {
      redirect(response.notification);
    }

    const foregroundSubscription =
      Notifications.addNotificationReceivedListener(() => { });
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) =>
        redirect(response.notification),
      );

    return () => {
      foregroundSubscription.remove();
      responseSubscription.remove();
    };
  }, []);
}
