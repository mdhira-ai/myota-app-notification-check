import { View, Text } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications';

export default function page() {
  const [notification, setNotification] = React.useState(null);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true
    }),
  });

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token =>
      setNotification(token)
    );
  }
    , [])


  return (
    <View>
      <Text>
        {
          notification
        }
      </Text>
    </View>
  )
}


async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  return token;
}