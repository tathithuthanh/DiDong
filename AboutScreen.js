import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements'


export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };
    render(){
    return (
      <ScrollView style={{flex: 1, backgroundColor:'black'}}>
      <Text style={styles.titleStyle}>Name</Text>
      <Text style={styles.textStyle}>Bookstore</Text>
      <Text style={styles.titleStyle}>Develope Team</Text>
      <Text style={styles.textStyle}>Nguyen Ngoc Tuyet Nhi</Text>
      <Text style={styles.textStyle}>Hoang Thi Kim Tien</Text>
      <Text style={styles.textStyle}>Phan Thi Nam Anh</Text>
      <Text style={styles.textStyle}>Ho Chi Minh University of Education</Text>
      <Text style={styles.titleStyle}>Released on:</Text>
      <Text style={styles.textStyle}>29/11/2019</Text>
      <Text style={styles.titleStyle}>Introduction: </Text>
      <Text style={styles.textStyle}>Are you looking for a smartphone application to serve the needs of searching and exploring books when you don't have time to go to your local bookstores? No worries, our "Bookstore" app will help you. "Bookstore" is an application that can meet all your needs. Our interface is designed to be simple, with convenient features to help you browse and find books by book titles or authors. Along with constant updates, our "Bookstore" always brings you the latest books. And you will never be bored because "Bookstore" has so many books that you could ever buy.
</Text>
      </ScrollView>
    )
  }
}
let styles = StyleSheet.create({
  textStyle: {
    color:'white',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 35,
    padding: 10
  }
})