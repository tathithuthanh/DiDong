import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements'

export default class IndexScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black' }}>
        <View style={{alignItems: 'center', paddingTop: 50}}>
            <Image
              style={{width: 250, height: 112}}
              source={{uri: 'https://media.discordapp.net/attachments/579017722017349632/647817800697511955/5de340d073f235650d615e9af760fae1.gif'}}
            />
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around', paddingTop: 10 }}>
          <Button
            title="Products"
            icon={{
              name: 'book',
              type: 'font-awesome',
              size: 20,
              color: 'white',
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={styles.buttonstyle}
            containerStyle={{ width: 150 }}
            onPress={() => this.props.navigation.navigate('Search')}
          />

          <Button
            title="My Cart"
            icon={{
              name: 'shopping-cart',
              type: 'font-awesome',
              size: 20,
              color: 'white',
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={styles.buttonstyle}
            containerStyle={{ width: 150 }}
            onPress={() => this.props.navigation.navigate('Cart')}
          />
          <Button
            title="About"
            icon={{
              name: 'info-circle',
              type: 'font-awesome',
              size: 20,
              color: 'white',
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={styles.buttonstyle}
            containerStyle={{ width: 150 }}
            onPress={() => this.props.navigation.navigate('About')}
          />
          <Button
            title="Contact"
            icon={{
              name: 'paper-plane',
              type: 'font-awesome',
              size: 20,
              color: 'white',
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={styles.buttonstyle}
            containerStyle={{ width: 150 }}
            onPress={() => this.props.navigation.navigate('Contact')}
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