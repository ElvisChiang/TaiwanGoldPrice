/* @flow */
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const {SERVER_DATA_TODAY} = require('./def');

type State = {
  dataSource: ListView.DataSource,
  loaded: boolean,
  date: string,
};

type Price = {
  hour: Number,
  minute: Number,
  buy: Number,
  sell: Number,
}

class Today extends Component {
  state: State;
  constructor() {
    super()
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      date: '',
    };
    this.fetchData();
  }

  fetchData() {
    fetch(SERVER_DATA_TODAY)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.price),
          loaded: true,
          date: responseData.date
        });
        console.log("today is " + this.state.date);
      })
      .done();
    }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader.bind(this)}
        renderRow={this.renderPrice.bind(this)}
        style={styles.listview}
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
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
    )
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.date}>Today is {this.state.date}</Text>
      </View>
    )
  }

  renderPrice(price: Price) {
    return (
      <View style={styles.container}>
        <Text style={styles.time}>{price.hour}:{price.minute}</Text>
        <Text style={styles.price}>{price.buy}</Text>
        <Text style={styles.price}>{price.sell}</Text>
      </View>
    );
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

module.exports = Today;
