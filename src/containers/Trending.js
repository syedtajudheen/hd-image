import React, { Component } from "react";
import { Text, ActivityIndicator, View, FlatList } from "react-native";
import { connect, MapStateToProps } from "react-redux";
import ImageCardItem from "../components/ImageCardItem";
import { FETCH_TRENDING_PHOTOS } from "../actions/TrendingAction";
import store from "../store";

const mapStateToProps = state => {
  return {
    trendingImages: state.TRENDING_PHOTOS.data,
    isFetched: state.TRENDING_PHOTOS.isFetched,
    page: state.TRENDING_PHOTOS.page,
    Favourites: state.FavouriteReducer
  };
};

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgLoad: false,
      data: [],
      showLoadingBottom: false,
      isFetched: false
    };
    this.onEndReached = this.onEndReached.bind(this);
    this.footerLoader = this.footerLoader.bind(this);
  }

  renderItem = item => {
    return (
      <ImageCardItem
        item={item}
        Favourites={this.props.Favourites}
        nav={this.props.navigation}
      />
    );
  };

  onEndReached = () => {
    const { page } = this.props;
    if (page) {
      this.setState({ showLoadingBottom: true });
      store.dispatch(FETCH_TRENDING_PHOTOS(page + 1, this.props.Favourites));
    }
  };

  footerLoader = () => {
    return (
      this.state.showLoadingBottom && (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )
    );
  };

  componentWillReceiveProps = nextprops => {
    // console.log("called", nextprops);

    if (this.props.trendingImages !== nextprops.trendingImages) {
      this.setState({
        data: [...this.state.data, ...nextprops.trendingImages],
        isFetched: nextprops.isFetched
      });
    }
  };

  componentWillUnmount = () => {
    this.setState({
      data: [],
      showLoadingBottom: ""
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        {this.state.data.length === 0 ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            extraData={this.state}
            data={this.state.data}
            renderItem={({ item }) => this.renderItem(item)}
            ItemSeparatorComponent={() => <View style={{ margin: 3 }} />}
            keyExtractor={item => item.id}
            onEndReached={this.onEndReached}
            ListFooterComponent={this.footerLoader}
            initialNumToRender={5}
            maxToRenderPerBatch={2}
            onEndReachedThreshold={0.5}
            removeClippedSubviews={true}
          />
        )
        // )
        // : (<View>
        //   <Text style={{  alignSelf:'center', fontWeight:'bold', fontSize:18}}>Failed to fetch data ! </Text>
        //   <Text style={{  alignSelf:'center', fontWeight:'bold', fontSize:18}}>Check network connection</Text>
        // </View>
        // )
        }
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Trending);
