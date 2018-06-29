
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;
    const price = item.price_formatted.split(' ')[0];
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer} >
            <View style={styles.imageContainer}>
              <Image style={styles.thumb} source={{ uri: item.img_url }} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.price}>{price}</Text>
              <View style={styles.textFooter}>
                <Image source={require('../assets/bed.png')} style={styles.icon}/>
                <Text style={styles.title}>{item.bedroom_number}</Text>
              </View>
              <View style={styles.textFooter}>
                <Image source={require('../assets/pin.png')} style={styles.icon} />
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class SearchResults extends Component {
  static navigationOptions = {
    title: 'Results',
  };

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (index) => {
    console.log("Pressed row: "+index);
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <FlatList
        data={params.listings}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    flex: 1, aspectRatio: 1.3, resizeMode: 'contain',   
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  imageContainer: {
    flex:2,
    flexDirection: 'row',    
    marginTop : -5
  },
  price: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3955dd'
  },
  title: {
    paddingLeft: 10,
    fontSize: 20,
    color: '#706969'
  },
  rowContainer: {
    flex: 1 ,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor:'#ffffff'
  },
  icon:{
    width: 24,
    height: 24  
  },
  textFooter:{
    paddingLeft: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
});