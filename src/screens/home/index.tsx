import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { useBook } from "../../hooks/useBooks";

import {
  BellSnoozeIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  StarIcon,
  ShareIcon,
} from "react-native-heroicons/solid";

const image = {
  uri: "https://source.unsplash.com/random/?cappuccino",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function Home() {
  const [expoPushToken, setExpoPushToken] = useState<string |null>("");
  const [notification, setNotification] = useState<boolean>(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const { name, author, group, chapter, number, text } = useBook();
  const [liked, setLiked] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: text,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const time = new Date(Date.now());
      time.setHours(6);
      time.setMinutes(0);
      time.setSeconds(0);
      const now = new Date("2022-10-18T07:00:00.000Z");
      const difference = now.getTime() - time.getTime(); // This will give difference in milliseconds
      const minutes = Math.round(difference / 60000);

      if (minutes >= 0 && minutes <= 180) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `🕊️ Mensagem de ${author} - ${chapter} : ${number}`,
            body: text,
            data: { data: "goes here" },
          },
          trigger: { seconds: 2 },
        });
        const nextTriggerDate = await Notifications.getNextTriggerDateAsync({
          hour: 7,
          minute: 0,
        });

        console.log(
          nextTriggerDate === null
            ? "No next trigger date"
            : new Date(nextTriggerDate)
        );
      }
    })();
  }, []);

  const removeNotification = useCallback(async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }, []);

  return (
    <>
      <ImageBackground
        className="w-full h-96 object-cover flex justify-between"
        source={image}
        resizeMode="cover"
      >
        <View
          className="w-11/12 mx-auto"
          style={{ marginTop: Constants.statusBarHeight + 20 }}
        >
          <View className="w-full flex flex-row justify-between">
            <TouchableOpacity onPress={() => removeNotification()}>
              <BellSnoozeIcon color={"#fff"} width={30} height={30} />
            </TouchableOpacity>
            <MagnifyingGlassIcon color={"transparent"} width={20} height={20} />
          </View>
        </View>
      </ImageBackground>
      <View className="-mt-8 w-full h-full bg-white rounded-t-3xl">
        <View className="-mt-8 w-9/12 mx-auto flex flex-row justify-end">
          <TouchableOpacity
            className="p-4 bg-white rounded-full shadow-xl"
            style={{
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
            onPress={() => setLiked(!liked)}
          >
            <HeartIcon
              color={`${liked ? "#9e0d0d" : "#c2c2c2"}`}
              width={30}
              height={30}
            />
          </TouchableOpacity>
        </View>
        <View className="w-10/12 mx-auto items-center pt-10">
          <View className="flex items-center justify-center p-3">
            <Text
              className="text-gray-600 text-lg font-semibold"
              style={{ fontFamily: "passenger-display-semibold" }}
            >
              {author} - {chapter} : {number}
            </Text>
            <Text
              className="text-black text-4xl mt-1 font-bold"
              style={{ fontFamily: "passenger-display-medium" }}
            >
              {name}
            </Text>
            <View className="flex flex-row items-center justify-center gap-x-1 mt-3">
              <StarIcon color={"#ca8317"} width={12} height={12} />
              <StarIcon color={"#ca8317"} width={12} height={12} />
              <StarIcon color={"#ca8317"} width={12} height={12} />
              <StarIcon color={"#ca8317"} width={12} height={12} />
              <StarIcon color={"#ca8317"} width={12} height={12} />
            </View>
            <Text
              className="text-[#60461f] text-base text-center mt-10"
              style={{ fontFamily: "passenger-display-semibold" }}
            >
              {text}
            </Text>
          </View>
        </View>
        <View className="w-10/12 mx-auto pt-10">
          <TouchableOpacity
            className="flex flex-row gap-x-4 py-4 items-center justify-center bg-yellow rounded-3xl bg-[#261507]"
            style={{
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
            onPress={onShare}
          >
            <ShareIcon color={"#ca8317"} width={15} height={15} />
            <Text
              className="text-white font-bold"
              style={{ fontFamily: "passenger-display-medium" }}
            >
              COMPARTILHE ESSA MENSAGEM
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
