import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, AsyncStorage, TextInput, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, TouchableHighlight, Alert, AppRegistry } from 'react-native';
import { Button, ButtonGroup, Icon, ListItem, Badge } from 'react-native-elements';
import Constants from 'expo-constants';
import { showMessage, hideMessage } from "react-native-flash-message";


export default class EditCartScreen extends React.Component {
constructor(props) {
  super(props);
  this.state={};
  AsyncStorage.getItem('state').then((myState) => {
    this.setState(JSON.parse(myState))
  })
  //console.log(this.state);
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
    this.props.navigation.replace('Cart')
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
  
async increase(a){
    let context = this;
    try {
        var data = await AsyncStorage.getItem('state');
        data = JSON.parse(data);
        var size = Object.keys(data).length;
        for (var index=0; index<size; index++) {
          if (Object.values(data[index]).indexOf(a) > -1) {
            data[index].amount = data[index].amount + 1;
            var total = data[index].amount * data[index].cost;
            total = total.toFixed(2);
            data[index].total = total ;
          }
        }
        AsyncStorage.setItem('state', JSON.stringify(data));
        this.setState(data);
    } catch (error) {
      // Error retrieving data
    }
}

async decrease(a){
    let context = this;
    try {
        var data = await AsyncStorage.getItem('state');
        data = JSON.parse(data);
        var size = Object.keys(data).length;
        var exist = false;
        for (var index=0; index<size; index++) {
          if (Object.values(data[index]).indexOf(a) > -1) {
            exist = true;
            data[index].amount = data[index].amount - 1;
            if(data[index].amount == 0)
            {
              data.splice(data.indexOf(a), 1);
              console.log(data);
              AsyncStorage.setItem('state', JSON.stringify(data));
              this.setState(data);
            }
            else {
            var total = data[index].amount * data[index].cost;
            total = total.toFixed(2);
            data[index].total = total ;
            console.log(data);
          }
        }
        AsyncStorage.setItem('state', JSON.stringify(data));
        this.setState(data);}
    } catch (error) {
      // Error retrieving data
    }
}



    render(){
    const { navigation } = this.props;
    const data = navigation.getParam('data');
    var x = JSON.parse(JSON.stringify(this.state));
      var array = [];
      for (var key in x) {
        array.push(x[key]);
    }
      //console.log(data);
      return (
        <View style={{flex: 1}}>
        <FlatList
          data={array}
          extraData={this.state}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ source: { uri: item.picture } }}
              title={item.title}
              subtitle={`$ ${item.cost}`}
              subtitleStyle={{color: 'green'}}
              rightSubtitle={
                  <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                  <Button icon={{
                      name: 'caret-up',
                      type: 'font-awesome',
                      size: 20,
                      color: 'black',
                    }}
                      buttonStyle={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent'
                      }}
                    onPress={() => { 
                    this.increase(item.id);
                    //console.log(this.state);
                    }}
                    />
                  <Text style={{paddingLeft:15, paddingRight: 15}}>{item.amount}</Text>
                  <Button icon={{
                      name: 'caret-down',
                      type: 'font-awesome',
                      size: 20,
                      color: 'black',
                    }}
                      buttonStyle={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent'
                      }}
                    onPress={() => { 
                    this.decrease(item.id);
                    //console.log(this.state);
                    }}
                    />
                  </View>
              }
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-around'}}>
          <Button
            title="Remove all"
            icon={{
              name: 'trash',
              type: 'font-awesome',
              size: 20,
              color: 'white',
            }}
            buttonStyle={styles.buttonstyle}
            containerStyle={{ width: 200 }}
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