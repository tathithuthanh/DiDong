import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, AsyncStorage, TextInput, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, TouchableHighlight, Alert, AppRegistry } from 'react-native';
import { Button, ButtonGroup, Icon, ListItem, Badge } from 'react-native-elements';
import Constants from 'expo-constants';
import { showMessage, hideMessage } from "react-native-flash-message";


export default class CartScreen extends React.Component {
constructor(props) {
  super(props);
  this.state = {};
  AsyncStorage.getItem('state').then((myState) => {
    this.setState(JSON.parse(myState))
  })
  console.log(this.state);
}
saveState() {
  AsyncStorage.setItem('state', JSON.stringify(this.state));
}

clearState() {
  AsyncStorage.removeItem('state');
  var x = [];
  AsyncStorage.setItem('state', JSON.stringify(x));
  AsyncStorage.getItem('state').then((myState) => {
  this.setState(JSON.parse(myState));
  })
}
  static navigationOptions =  ({ navigation }) => {
    return {
    title: 'My Cart',
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
            name: 'edit',
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
      ),
    }
  };
    _go = () => {
    AsyncStorage.getItem('state').then((myState) => {
    this.setState(JSON.parse(myState))
    })
    var x = JSON.parse(JSON.stringify(this.state));
    var array = [];
      for (var key in x) {
        array.push(x[key]);
      }
    this.props.navigation.replace('Edit', {data: array} )
    }
  componentDidMount() {
    this.props.navigation.setParams({ go: this._go });
  }
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
  
    render(){
      var x = JSON.parse(JSON.stringify(this.state));
      var array = [];
      for (var key in x) {
        array.push(x[key]);
      }
      //this.setState()
      console.log(this.state);
      return (
        <View style={{flex: 1}}>
        <FlatList
          data={array}
          extraData={this.state}
          renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.props.navigation.replace('Details', {
                data: item
              })}>
            <ListItem
              leftAvatar={{ source: { uri: item.picture } }}
              title={item.title}
              subtitle={`$ ${item.cost}`}
              subtitleStyle={{color: 'green'}}
              rightSubtitle={
                  <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                  <Text>Quantity: {item.amount}</Text>
                  <Text style={{color:'green'}}>Total:</Text>
                  <Text style={{color:'green'}}>$ {item.total}</Text>
                  </View>
              }
            />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-around'}}>
          <Button
            title="Buy Now"
            icon={{
              name: 'money',
              type: 'font-awesome',
              size: 20,
              color: 'white',
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={styles.buttonstyle}
            containerStyle={{ width: 300 }}
            onPress={() => { 
              this.props.navigation.replace('Pay', {data: array});
            }
            }
          />
          <Button
            icon={{
              name: 'trash',
              type: 'font-awesome',
              size: 20,
              color: 'white',
            }}
            buttonStyle={styles.buttonstyle}
            containerStyle={{ width: 60 }}
            onPress={() => { 
            Alert.alert(
              'Remove All',
              'Do you really want to remove all books from your cart?',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                {text: 'OK',
                onPress: () => {
                  console.log('Delete all...');
                  this.clearState();
                  showMessage({
                    message: "Remove success!",
                    description: "Your cart is empty now!",
                    type: "success",
                    floating: true,
                    icon: "warning"
                  });
                  this.props.navigation.replace('Cart');
                }},
              ],
              { cancelable: false }
            )}
            }
          />
        </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
  buttonstyle: {
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 30
  },
})