import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import Hot from "../containers/Hot";
import Trending from "../containers/Trending";
import Favourite from "../containers/Favourite";
import ImageDetail from '../containers/ImageDetail';
import EvilIcons from "react-native-vector-icons/EvilIcons";

const TabNav = createMaterialTopTabNavigator(
  {
    Hot: {
      screen: Hot
    },
    Trending: {
      screen: Trending
    },
    Favourite: {
      screen: Favourite
    }
  },
  {
    initialRouteName: "Trending",
    removeClippedSubViews: false,
    lazy: true,
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: "#000"
      },
      labelStyle: {
        color: "#000"
      },
      style: {
        backgroundColor: "#fff"
      }
    }
  }
);

const StackNav = createStackNavigator({
  Tab: {
    screen: TabNav,
    navigationOptions: ({ navigation }) => ({
      header: (
        <View
          style={{
            flex: 0.12,
            backgroundColor: "#000",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <EvilIcons
          onPress={()=> navigation.toggleDrawer()}
            name="navicon"
            size={34}
            color="#fff"
            style={{ flex: 2, padding: 10 }}
          />
          <Text
            style={{
              flex: 8,
              padding: 18,
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20
            }}
          >
            UnSplash
          </Text>
          <EvilIcons
            name="search"
            size={34}
            color="#fff"
            style={{ flex: 2, padding: 10 }}
          />
        </View>
      )
    })
  },
  ImageDetail:{
    screen: ImageDetail
  }
});
 const DrawerNav = createDrawerNavigator({
     Drawer:{
         screen: StackNav
     }
 },
{
    useNativeAnimations: true,
    contentComponent: (navigation)=>{
return(
    <View style={{flex:1}}>
    <Text>hhhhhh</Text>

    </View>
)
    }
})
export default DrawerNav;
