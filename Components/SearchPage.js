import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,ActivityIndicator,Image,Alert } from 'react-native';


function urlForQueryAndPage (key, value, pageNumber){
    const data ={
        encoding: 'json',
        pretty: '1',
        action: 'search_listings',
        country: 'uk',     
        listing_type: 'buy',                
    }
    data[key]= value

    const queryString = Object.keys(data)
    .map(key => key + '='+ encodeURIComponent(data[key]))
    .join('&');   

    return 'https://api.nestoria.co.uk/api?' + queryString;    
}

export default class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            searchString: 'london',
            isLoading: false,
            message: ''
        };
    }

    onSearchTextChanged = (text) =>{
        this.setState({ searchString: text});        
    }

    executeQuery =(query)=>{        
        this.setState({isLoading: true});
        fetch(query)
        .then(response => response.json())
        .then(json => this._handleResponse(json.response))
        .catch(
            error => this.setState({
                isLoading: false,
                message: 'Something bad happened' + error
            })          
        )
    }

    _handleResponse = (response)=>{        
        this.setState({ isLoading: false , message: '',searchString:'' });
        if (response.application_response_code.substr(0, 1) === '1') {            
            this.props.navigation.navigate('Results', {listings: response.listings});
        } else {
            this.setState({ message: 'Location not recognized; please try again.'});
        }
    }

    onSearchPressed = () =>{
        const query = urlForQueryAndPage('place_name',this.state.searchString,1);
        this.executeQuery(query);        
    }


  static navigationOptions ={
    title: 'Property Finder',
  }
  
  render() {    
    return (
        <View style={styles.container}>
            <Text style={styles.description}>
            {this.state.message}
            </Text>
            <Text style={styles.description}>
            Explore Houses
            </Text>
            
            <View style={styles.flowRight} elevation={5}>
                <TextInput
                    underlineColorAndroid={'transparent'}
                    style={styles.searchInput}
                    placeholder='Search via name or postcode'                    
                    onChangeText={this.onSearchTextChanged} 
                    value={this.state.searchString}
                    />
                <Button                    
                    onPress={this.onSearchPressed}
                    color='#1a1a1a'
                    title='Go'/>          
            </View>
            <Image source={require('../assets/house.jpg')}
                style={styles.image} />
            { this.state.isLoading &&
                <ActivityIndicator size='large' color='#383232'/>
            }
      </View>      
    );
  }
}

const styles = StyleSheet.create({
    description: {
      marginBottom: 20,
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#363636'
    },
    container: {
      padding: 30,
      //marginTop: 65,
      alignItems: 'center',
      backgroundColor: '#FCFCFC',
      flex: 1
    },
    flowRight:{
        flexDirection : 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        padding:10,
        backgroundColor:'#fcfcfc',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1
        },
        
    },
    image:{
        borderRadius: 30,
        width: 217,
        height: 138,
        flex:1,
        resizeMode: 'contain'      
    },
    searchInput: {
        height: 36,
        padding: 4 ,
        fontSize: 16,
        marginRight: 5,
        flexGrow: 1,
        borderWidth: 1,
        borderColor: '#fcfcfc',
        borderRadius: 8,
        color: '#1A1A1A',
        
    }
  });