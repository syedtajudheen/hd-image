import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
var RNFS = require("react-native-fs");
var { height, width } = Dimensions.get("window");

export default class ImageDetail extends Component {
  static navigationOptions = {
    title: "Image Download"
  };

  constructor(props) {
    super(props);
    this.state = {
      imgWidth: width,
      imgHeight: height
    };
  }
  componentWillMount = () => {
    Image.getSize(
      this.props.navigation.state.params.urls.regular,
      (srcwidth, srcheight) => {
        // console.log("widh", srcwidth, "height", srcheight);
        this.setState({
          imgWidth: srcwidth,
          imgHeight: srcheight
          //  height * (width / srcwidth)
        });
      },
      () => {
        this.setState({
          imgWidth: width,
          imgHeight: 400
          //  height * (width / srcwidth)
        });
      }
    );
  };
  downloadImage=()=>{
      const { navigation } = this.props;
      const downloadDest = `${RNFS.ExternalDirectoryPath}/${navigation.state.params.id}.jpg`;
    RNFS.downloadFile({fromUrl: navigation.state.params.urls.full, toFile: downloadDest }).promise.then(res => {
        Alert.alert('Downloaded successfully')
      });
  }
componentWillUnmount(){
  this.setState({
    imgHeight: '',
    imgWidth: ''
  })
}
  render() { 
    return (
      <ScrollView style={{ flex: 1 }}>
        <Image
          style={{
            width: "100%",
            height: this.state.imgWidth > this.state.imgHeight ? 270 : 450,
            backgroundColor: "#000"
          }}
          source={{ uri: this.props.navigation.state.params.urls.regular }}
          resizeMode="contain"
        />
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
            padding: 5
          }}
        >
          {this.state.imgWidth} X {this.state.imgHeight}
        </Text>
        <TouchableOpacity onPress={()=> this.downloadImage()}>
          <View style={{ padding: 10, backgroundColor: "black" }}>
            <Text style={{ color: "#fff", padding: 5, alignSelf: "center" }}>
              Download
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
