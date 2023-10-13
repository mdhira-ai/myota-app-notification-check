import { View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications';
import axios from 'axios';

export default function page() {
  const [notificationt, setNotification] = React.useState(null);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token =>
      setNotification(token)
    );



  }, [
    notificationt
  ])


  const url = 'https://exp.host/--/api/v2/push/send';
  const data = {
    to: 'ExponentPushToken[rjqn9UKS0d1uMNpz7xwtIJ]',
    title: 'i am new user',
    body: 'hello bro',
    data:{
      url:"/about",

    }

  };

  const headers = {
    'Content-Type': 'application/json',
  };

  function send() {
    axios.post(url, data, { headers })
      .then(response => {
        console.log('Push notification sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending push notification:', error);
      });
  }



  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}

    >
      <Text

      >
        {
          notificationt
        }
      </Text>

      <Pressable
        style={{
          backgroundColor: "black",
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
        }}

        onPress={() => {
          send();
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
          }}
        >Send notification someone</Text>
      </Pressable>
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