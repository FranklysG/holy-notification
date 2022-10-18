import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Constants from 'expo-constants';

import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  StarIcon,
  ShareIcon,
} from "react-native-heroicons/solid";

const image = {
  uri: "https://source.unsplash.com/random/?cappuccino",
};

export function SignIn() {
  return (
    <>
      <ImageBackground
        className="w-full h-96 object-cover flex justify-between"
        source={image}
        resizeMode="cover"
      >
        <View
          className="w-11/12 mx-auto"
          style={{ marginTop: Constants.statusBarHeight+20}}
        >
          <View className="w-full flex flex-row justify-between">
            <ArrowLeftIcon color={"#fff"} width={20} height={20} />
            <MagnifyingGlassIcon color={"transparent"} width={20} height={20} />
          </View>
        </View>
      </ImageBackground>
      <View className="-mt-8 w-full h-full bg-white rounded-t-3xl">
        <View className="w-10/12 mx-auto items-center pt-10">
          <View className="flex items-center justify-center p-3">
            <Text
              className="text-gray-600 text-lg font-semibold"
              style={{ fontFamily: "passenger-display-semibold" }}
            >
              HOLY NOTIFCATION
            </Text>
            <Text
              className="text-black text-4xl mt-1 font-bold"
              style={{ fontFamily: "passenger-display-medium" }}
            >
              ENTRE COM SUA CONTA
            </Text>
            <Text
              className="text-[#60461f] text-base text-center mt-10"
              style={{ fontFamily: "passenger-display-semibold" }}
            >
              entre
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
            onPress={() => {}}
          >
            <ShareIcon color={"#ca8317"} width={15} height={15} />
            <Text
              className="text-white font-bold"
              style={{ fontFamily: "passenger-display-medium" }}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
