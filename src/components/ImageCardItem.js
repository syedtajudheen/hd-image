import React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store';
var { height, width } = Dimensions.get("window");

const ImageCardItem = ({ item, nav, favouriteCb }) => {
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 10
      }}
    >
            <TouchableOpacity activeOpacity={0.7} onPress={()=> nav.navigate('ImageDetail',item)}>
            
      <ImageBackground
        style={{ flex: 8, width: width - "5%", height: 400 }}
        source={{ uri: item.urls.small, cache: 'force-cache'}}
        resizeMode={"cover"}
      >
      <TouchableOpacity onPress={()=> favouriteCb(item)}>
      {
        // item.favIcon ?
        <FontAwesome
              name="star"
              size={30}
              color="yellow"
              style={{ alignSelf:'flex-end',padding:10 }}
             />
            //  :
            // <FontAwesome
            //   name="star-o"
            //   size={30}
            //   color="#F80B0B"
            //   style={{ alignSelf:'flex-end',padding:10 }}
            // />
      }
      </TouchableOpacity>
      
      </ImageBackground>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          padding: 10,
          alignItems: "center",
          backgroundColor: "#E3E3E3"
        }}
      >
        <View style={{ padding: 5, flexDirection: "row" }}>
          <Image
            style={{ width: 20, height: 20, borderRadius: 10 }}
            source={{ uri: item.user.profile_image.small }}
            resizeMode="contain"
          />
          
          <Text style={{ paddingLeft: 5, fontWeight: "bold" }}>
            {item.user.username}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 8, flexDirection: "row" }}>
            <EvilIcons
              name="heart"
              size={32}
              color="#F80B0B"
              style={{ padding: 8, paddingLeft: 0, paddingRight: 0 }}
            />
            <Text
              style={{
                padding: 8,
                paddingLeft: 0,
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              {item.likes}
            </Text>
          </View>

          <Ionicons
            name="md-share-alt"
            size={30}
            color="#585858"
            style={{ flex: 1, padding: 8, paddingLeft: 0, paddingRight: 0 }}
          />
        </View>
      </View>
    </View>
  );
};

export default ImageCardItem;
