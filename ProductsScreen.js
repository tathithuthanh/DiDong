import React from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import { ListItem, Button } from 'react-native-elements';

export default class ProductsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Products',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => 
      (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center'}}>
            <Button
            icon={{
              name: 'search',
              type: 'font-awesome',
              size: 20,
              color: 'white',
            }}
            buttonStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent'
            }}
            containerStyle={{ width: 50 }}
            onPress={navigation.getParam('gos')}

          />
          <Button
            icon={{
              name: 'shopping-cart',
              type: 'font-awesome',
              size: 20,
              color: 'white',
            }}
            buttonStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent'
            }}
            containerStyle={{ width: 50 }}
            onPress={navigation.getParam('goc')}
          />
      </View>
      )
    }
  };
  
  componentDidMount() {
    this.props.navigation.setParams({ gos: this._gos });
    this.props.navigation.setParams({ goc: this._goc });
    this.makeRemoteRequest();
  }
  _gos = () => {
    this.props.navigation.navigate('Search')}
  _goc = () => {
    this.props.navigation.navigate('Cart')}
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
    };
  }

  makeRemoteRequest = () => {
    const url = `https://cdn.discordapp.com/attachments/416634292718927882/648887808664010778/Database`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '93%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%',
        }}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {
                data: item
              })}>
        
            <ListItem
              leftAvatar={{ source: { uri: item.picture } }}
              title={item.title}
              subtitle={item.author}
              rightSubtitle={`$ ${item.cost}`}
              rightSubtitleStyle={{color: 'green'}}
            />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}