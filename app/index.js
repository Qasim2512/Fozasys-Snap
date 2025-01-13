/** @format */

import { View, Text } from "react-native";
import { Drawer } from "react-native-paper";
import * as React from "react";
import { ProgressBar, MD3Colors } from "react-native-paper";

const Home = () => {
  return (
    <View>
      <Text>Home ihuihuihuihiuhiuhiuh uihuihuihiuhuihuihiuhi</Text>
      <ProgressBar progress={0.5} color={MD3Colors.error50} />
      <Drawer.CollapsedItem
        focusedIcon="inbox"
        unfocusedIcon="inbox-outline"
        label="Inbox"
      />
    </View>
  );
};

export default Home;
