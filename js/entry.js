/* @flow */
import React from 'react';

import {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';

var Today = require('./today');
var Year = require('./year');

type State = {
  selectedTab: string,
};

class Entry extends Component {
  state: State;

  constructor() {
    super()
    this.state = {
        selectedTab: 'today'
    };
  }
  render() {
    return(
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'today'}
          title='Today'
          onPress={() => {
            this.setState({
              selectedTab: 'today'
            });
          }}>
          <Today />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'year'}
          title='Whole Year'
          onPress={() => {
            this.setState({
              selectedTab: 'year'
            });
          }}>
          <Year />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
});

module.exports = Entry;
