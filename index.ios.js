/* @flow */
'use strict';

import React from 'react';

import {
  AppRegistry,
  TabBarIOS,
} from 'react-native';
const strings = require('./js/l10n/strings');
var Price = require('./js/price');

type State = {
  selectedTab: string,
};

class Entry extends React.Component {
  state: State;

  constructor() {
    super();
    this.state = {
        selectedTab: 'today'
    };
  }
  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'today'}
          title={strings.today}
          onPress={() => {
            this.setState({
              selectedTab: 'today'
            });
          }}>
          <Price type="today" />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'year'}
          title={strings.pastYear}
          onPress={() => {
            this.setState({
              selectedTab: 'year'
            });
          }}>
          <Price type="year" />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('GoldPrice', () => Entry);
