import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ListItem, SearchBar, Button } from 'react-native-elements';


export default class SearchProductsScreen extends React.Component {
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
          onPress={navigation.getParam('go')}
        />
      )
  }
    };
  
  _go = () => {
    this.props.navigation.navigate('Cart')}

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.props.navigation.setParams({ go: this._go });
    this.makeRemoteRequest();
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
        this.arrayholder = res.results;
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

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.author.toUpperCase()} ${item.genre.toUpperCase()}}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search for book's title, author or genre..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
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
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}