import React from 'react';
import { View } from 'react-native';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import SearchProductsScreen from './screen/SearchProductsScreen';
import DetailScreen from './screen/DetailScreen';
import IndexScreen from './screen/IndexScreen';
import ContactScreen from './screen/ContactScreen';
import CartScreen from './screen/CartScreen';
import AboutScreen from './screen/AboutScreen';
import PayScreen from './screen/PayScreen';
import EditCartScreen from './screen/EditCartScreen';
import FlashMessage from "react-native-flash-message";

export default class Movie extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppContainer/>
        <FlashMessage position="top" />
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Index: {
    screen: IndexScreen,
    navigationOptions: {
      header:null
		}
  },
  Search: {
    screen: SearchProductsScreen,
  },
  Details: {
    screen: DetailScreen,
  },
  Contact: {
    screen: ContactScreen,
  },
  Cart: {
    screen: CartScreen,
  },
  About: {
    screen: AboutScreen,
  },
  Pay: {
    screen: PayScreen,
  },
  Edit: {
    screen: EditCartScreen,
  }
}, {
  initialRouteName: 'Index',
});

const AppContainer = createAppContainer(AppNavigator);

