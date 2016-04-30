/* @flow */
'use strict';

import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
} from 'react-native';

const strings = require('./js/l10n/strings');
var Price = require('./js/price');

type State = {
  title: string;
}

class Entry extends React.Component {
  state: State;
  constructor() {
    super();
    this.state = {
      title: 'today',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.title}</Text>
        <ViewPagerAndroid
          style={styles.viewPager}
          onPageSelected={(e) => {
            this.setState({title: e.nativeEvent.position === 0 ? strings.today : strings.pastYear});
          }}
          initialPage={0}>
          <View style={styles.pageStyle}>
            <Price type="today" />
          </View>
          <View style={styles.pageStyle}>
            <Price type="year" />
          </View>
        </ViewPagerAndroid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
  },
  viewPager: {
    flex: 1,
  },
  pageStyle: {
    alignItems: 'stretch',
  },
});

AppRegistry.registerComponent('GoldPrice', () => Entry);
