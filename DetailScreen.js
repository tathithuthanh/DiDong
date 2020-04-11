import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator, ScrollView, SafeAreaView, Alert, AsyncStorage } from 'react-native';
import { ListItem, SearchBar, Button } from 'react-native-elements';
import CartScreen from './CartScreen';
import { showMessage, hideMessage } from "react-native-flash-message";


export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    const { navigation } = this.props;
    const data = navigation.getParam('data');
    this.setState(this.state = data)    
  }
  
  async checkx(){
    let context = this;
    try {
        var data = await AsyncStorage.getItem('state');
        data = JSON.parse(data);
        console.log(data);
        if(!data) {
            data = [];
            console.log("nullx");
            data[0] = { 'id': this.state.id, 'amount': 1, 'title': this.state.title, 'cost': this.state.cost, 'author': this.state.author, 'picture': this.state.picture, 'total': this.state.cost, 'publisher': this.state.publisher, 'date': this.state.date, 'genre': this.state.genre, 'introduction': this.state.introduction};
            console.log(data);
          }
        else {
        var size = Object.keys(data).length;
        console.log(size);
        var exist = false;

        for (var index=0; index<size; index++) {
          if (Object.values(data[index]).indexOf(this.state.id) > -1) {
            exist = true;
            data[index].amount = data[index].amount + 1;
            var total = data[index].amount * data[index].cost;
            total = total.toFixed(2);
            data[index].total = total ;
            //console.log
          }
        }
          if (exist == false) {
          data[size] = { 'id': this.state.id, 'amount': 1, 'title': this.state.title, 'cost': this.state.cost, 'author': this.state.author, 'picture': this.state.picture, 'total': this.state.cost, 'publisher': this.state.publisher, 'date': this.state.date, 'genre': this.state.genre, 'introduction': this.state.introduction};
          //console.log(data);
          }
        }
        AsyncStorage.setItem('state', JSON.stringify(data));

    } catch (error) {
      // Error retrieving data
    }
}
  async checkd(){
    let context = this;
    try {
        var data = await AsyncStorage.getItem('state');
        data = JSON.parse(data);
        var size = Object.keys(data).length;
        var exist = false;
        for (var index=0; index<size; index++) {
          if (Object.values(data[index]).indexOf(this.state.id) > -1) {
            exist = true;
            data[index].amount = data[index].amount - 1;
            var total = data[index].amount * data[index].cost;
            total = total.toFixed(2);
            data[index].total = total ;
            if(data[index].amount == 0) {
            data.splice(data.indexOf(this.state.id), 1 );
          }
          }
        }
          if (exist == false) {
              showMessage({
              message: "Failed!",
              description: "This book is not in your cart yet!",
              type: "danger",
              floating: true,
              icon: "danger"
            });
          }
        AsyncStorage.setItem('state', JSON.stringify(data));

    } catch (error) {
      // Error
    }
}


  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Book Details',
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
      ),
    }
  };
  _go = () => {
    this.props.navigation.replace('Cart')
    }

  componentDidMount() {
    this.props.navigation.setParams({ go: this._go });
  }

  seperator() {
    return (
      <View style={{ height: 1, backgroundColor: 'lightgray', margin: 5}}/>
    );
  }

  render(){
    
    return (
    <SafeAreaView style={styles.safecontainer}>
      <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1, alignItems: 'center'}}>
        <Image style={styles.image} source={{ uri: this.state.picture }} />
        <Text style={styles.subTitle}> Price: $ {this.state.cost}</Text>
      </View>
      <View style={{flex: 2, padding: 10 }}>
        <Text style={styles.title}>{this.state.title}</Text>
        <Text>Author: {this.state.author}</Text>
        {this.seperator()}
        <Text>Publisher: {this.state.publisher}</Text>
        {this.seperator()}
        <Text>Date published: {this.state.date}</Text>
        {this.seperator()}
        <Text>Genre: {this.state.genre}</Text>
        {this.seperator()}
        <Text>{this.state.introduction}</Text>
      </View>
      <View style={styles.buttonContainer}>
      <View>
        <Button
          title="Add to cart"
          icon={{
            name: 'cart-plus',
            type: 'font-awesome',
            size: 20,
            color: 'white',
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'black',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
          }}
          containerStyle={{ width: 200 }}
          onPress={() => { 
            Alert.alert(
              'Add to cart',
              'Do you want to add this book to your cart?',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                {text: 'OK',
                onPress: () => {
                  console.log('Item added!');
                  this.checkx();
                  showMessage({
                    message: "Success!",
                    description: "This book has been added to your cart!",
                    type: "success",
                    floating: true,
                    icon: "success"
                  });
                }},
              ],
              { cancelable: false }
            )}}
        /> 
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
    )
  }
}

let styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    padding: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  image: {
    height: 300,
    width: 200,
    resizeMode: 'stretch'
  },
  title: {
    fontSize: 25,
    paddingBottom: 20,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 20,
    paddingTop: 10
  }
})