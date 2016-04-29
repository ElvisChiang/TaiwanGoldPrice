/* @flow */
'use strict';

import React from 'react';
import {
  ListView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const strings = require('./l10n/strings');
const {SERVER_DATA_TODAY, SERVER_DATA_YEAR} = require('./def');

type State = {
  dataSource: ListView.DataSource,
  loaded: boolean,
  error: string,
  date: string,
  refreshing: boolean,
  type: string,
};

type Prop = {
  type: string,
}

type Price = {
  date: string,
  hour: number,
  minute: number,
  buy: number,
  sell: number,
}

class PriceView extends React.Component {
  state: State;

  constructor(props: Prop) {
    super(props);
    console.log(props.type);
    var source;
    if (props.type === 'year') {
      source = 'year';
    } else { // default is today
      source = 'today';
    }
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      error: '',
      date: '',
      refreshing: false,
      type: source,
    };
    this.fetchData();
  }

  fetchData() {
    var url = this.state.type === 'today' ? SERVER_DATA_TODAY : SERVER_DATA_YEAR;
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.price),
          loaded: true,
          date: responseData.date,
          error: '',
          refreshing: false,
        });
        console.log('today is ' + this.state.date);
      })
      .catch(err => {
        console.log('fetch error: ' + err.message);
        this.setState({
          error: err.message
        });
      })
      .done();
    }

    _onRefresh() {
      this.setState({refreshing: true});
      this.fetchData();
    }

  render() {
    if (this.state.error) {
      return this.renderErrorView();
    }

    if (this.state.loaded === false) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader.bind(this)}
        renderRow={this.renderPrice.bind(this)}
        style={styles.listview}
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
        }
        />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading gold price...
        </Text>
      </View>
    );
  }

  renderErrorView() {
    return (
      <View style={styles.container}>
        <Text>{this.state.error}</Text>
      </View>
    );
  }

  renderHeader() {
    if (this.state.type === 'year') {
      return (
        <View />
      );
    }

    return (
      <View style={styles.headerContainer}>
        <Text style={styles.date}>{strings.todayis}{this.state.date}</Text>
      </View>
    );
  }

  renderPrice(price: Price) {
    if (this.state.type === 'today') {
      return (
        <View style={styles.container}>
          <Text style={styles.time}>{price.hour}:{price.minute}</Text>
          <Text style={styles.price}>{price.buy}</Text>
          <Text style={styles.price}>{price.sell}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.date}>{price.date}</Text>
          <Text style={styles.price}>{price.buy}</Text>
          <Text style={styles.price}>{price.sell}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  date: {
    fontSize: 16,
    margin: 8,
    textAlign: 'left',
  },
  time: {
    fontSize: 18,
    margin: 8,
    textAlign: 'right',
  },
  price: {
    fontSize: 18,
    margin: 8,
    textAlign: 'center',
  },
  listview: {
    flex: 1,
    marginBottom: 50,
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

module.exports = PriceView;
