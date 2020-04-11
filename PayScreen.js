import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Alert, AsyncStorage, FlatList, SafeAreaView } from 'react-native';
import { Button, ButtonGroup, Icon, ListItem } from 'react-native-elements'
import { showMessage, hideMessage } from "react-native-flash-message";

export default class PayScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    name:'',
    phone: '',
    email: '',
    street: '',
    }
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
  shouldComponentUpdate() {
  return false;
  }
  static navigationOptions = {
    title: 'Buy Now',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  render(){
    const { navigation } = this.props;
    const data = navigation.getParam('data');
    return (
    <SafeAreaView style={styles.safecontainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{
            padding: 12,
            borderRadius: 5,
            backgroundColor: '#474747',
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 17}}>Please confirm your order and checkout your cart.</Text>
        </View>
        <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
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
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
        </View>
          <View style={styles.panel}>
            <Text style={styles.textColor}>Full Name</Text>
            <TextInput style={styles.inputStyle} 
            keyboardType="default" 
            placeholder="Please insert your full name here."
            onChangeText={(value) => this.setState({name: value})}
            />
            <Text style={styles.textColor}>Phone Number</Text>
            <TextInput style={styles.inputStyle}
            keyboardType="phone-pad"
            placeholder="Please insert your phone number here."
            onChangeText={(value) => this.setState({phone: value})}
            />
            <Text style={styles.textColor}>E-mail</Text>
            <TextInput style={styles.inputStyle}
            keyboardType="email-address"
            placeholder="Please insert your email here."
            onChangeText={(value) => this.setState({email: value})}
            />
            <Text style={styles.textColor}>Address</Text>
            <TextInput style={styles.inputStyle}
            keyboardType="default"
            placeholder="Please insert your address here."
            onChangeText={(value) => this.setState({street: value})}
            /> 
          </View>   
        
        <Button title="Buy Now"
        titleStyle={{ fontWeight: '700', fontSize: 30 }}
        buttonStyle={{
            backgroundColor: 'black',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
        }}
        onPress = { () => {
        const {name, phone, email, street} = this.state;
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        if (data.length == 0)
        { return showMessage({
              message: "Your cart is empty!",
              description: "Please add something to your cart!",
              type: "danger",
              floating: true,
              icon: "danger"
        });}
        else if (name == '') 
        { return showMessage({
              message: "Full name is required!",
              description: "Please insert your full name!",
              type: "danger",
              floating: true,
              icon: "danger"
        });}
        else if (phone == '')
        { return showMessage({
              message: "Phone number is required!",
              description: "Please insert your phone number!",
              type: "danger",
              floating: true,
              icon: "danger"
        });}
        else if (email == '')
        { return showMessage({
              message: "E-mail is required!",
              description: "Please insert your e-mail!",
              type: "danger",
              floating: true,
              icon: "danger"
        });}
        else if (street == '')
        { return showMessage({
              message: "Address is required!",
              description: "Please insert your home address!",
              type: "danger",
              floating: true,
              icon: "danger"
        });}
        else {
        let customer = { name: name, phone: phone, email: email, street: street}
        console.log("Items: ",data, "Info: ", customer);
        this.setState({name: ''});
        this.setState({phone: ''});
        this.setState({email: ''});
        this.setState({street: ''});
        this.clearState();
        this.props.navigation.replace('Cart');
        showMessage({
              message: "Thanks for buying!",
              description: "Feel free to contact us if you have any problems.",
              type: "success",
              floating: true,
              icon: "success"
        })
        }
        }}
        ></Button>
      </ScrollView>
    </SafeAreaView>
    )
  }
}
let styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  panel: {
    backgroundColor: '#474747',
    borderRadius: 3,
    padding: 10,
    margin: 10,
  },
  textColor: {
    color: 'white',
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 17
  },
  safecontainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    padding: 10,
    paddingBottom: 20
  },
})