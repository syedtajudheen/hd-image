import React, { Component } from "react";
import { ActivityIndicator, View, FlatList } from "react-native";
import { connect, MapStateToProps } from "react-redux";
import ImageCardItem from "../components/ImageCardItem";
import { FETCH_TRENDING_PHOTOS } from "../actions/TrendingAction";
import {favouriteItem} from "../actions/FavouriteAction";
import store from "../store";

const mapStateToProps = state => {
  return {
    trendingImages: state.TRENDING_PHOTOS.data,
    page: state.TRENDING_PHOTOS.page
  };
};

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgLoad: false,
      data: [],
      showLoadingBottom: false
    };
    this.onEndReached = this.onEndReached.bind(this);
    this.footerLoader = this.footerLoader.bind(this);
    this.onFavourite =  this.onFavourite.bind(this);
  }

  renderItem = item => {
    return <ImageCardItem item={item} favouriteCb={(item)=>this.onFavourite(item)} nav={this.props.navigation} />;
  };

  onEndReached = () => {
    const { page } = this.props;
    if (page) {
      this.setState({ showLoadingBottom: true });
      store.dispatch(FETCH_TRENDING_PHOTOS(page + 1));
    }
  };

  footerLoader = () => {
    return (
      this.state.showLoadingBottom && (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size="small" color="red" />
        </View>
      )
    );
  };

  onFavourite=(item)=>{
    console.log('favoruite')
    store.dispatch(favouriteItem([item]))
    this.setState({favIcon:true})
  }

  componentWillReceiveProps = nextprops => {
    this.setState({
      data: [...this.state.data, ...nextprops.trendingImages]
    });
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
        )}
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Trending);
