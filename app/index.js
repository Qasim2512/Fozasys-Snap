/** @format */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./Home/Home";
import Posts from "./Posts/posts";

const Tab = createBottomTabNavigator();
const Index = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Posts" component={Posts} />
    </Tab.Navigator>
  );
};

export default Index;
