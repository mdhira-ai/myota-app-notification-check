import * as Notifications from 'expo-notifications';
import { Slot, router } from 'expo-router';
import React from 'react';


function useNotificationObserver() {
    React.useEffect(() => {
        let isMounted = true;

        function redirect(notification) {
            const url = notification.request.content.data?.url;
            if (url) {
                console.log(url)
                router.push(url);
            }
        }

        Notifications.getLastNotificationResponseAsync()
            .then(response => {
                if (!isMounted || !response?.notification) {
                    return;
                }
                redirect(response?.notification);
            });

        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            redirect(response.notification);
        });

        return () => {
            isMounted = false;
            subscription.remove();
        };
    }, []);
}

export default function Layout() {
    useNotificationObserver();

    return <Slot />;
}
