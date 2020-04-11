import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Linking, SafeAreaView } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements'

export default class ContactScreen extends React.Component {

  static navigationOptions = {
    title: 'Contact Us',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  render() {
    return  (
      <ScrollView style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center'}}>
        <Button
          icon={{
            name: 'question-circle',
            type: 'font-awesome',
            size: 175,
            color: 'white',
          }}
          iconContainerStyle={{ marginRight: 10 }}
          buttonStyle={{
            backgroundColor: 'black',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{ width: 225 }}
        />
        <Text style={styles.title}>Need some helps?</Text>
        <Text style={styles.subTitle}>Get lost? Don't know how to use? Feel free to get in touch with us.</Text>
      </View>

      <View style={styles.containerButton}>
        <Button
          title="Contact Us"
          icon={{
            name: 'envelope',
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
          containerStyle={{ width: 250 }}
          onPress={() => 
          Linking.openURL('mailto:support@bookstore.com?subject=About "Bookstore App" &body=Please describe your problem here.')}
        />
        <View style={{padding: 10}}></View>
        <Button
          title="Hotline"
          icon={{
            name: 'phone',
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
          containerStyle={{ width: 250 }}
          onPress={() => Linking.openURL(`tel:999`)}
        />
      </View>
      </ScrollView>
    )
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'black'
  },
  containerButton: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 25,
    paddingTop: 30,
    paddingBottom: 20,
    textAlign: 'center',
    color: 'white'
  },
  subTitle: {
    fontSize: 15,
    color: 'lightgray',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  }
})