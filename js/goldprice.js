/**
 * Entry of iOS app
 */

// const setup = require('./setup');

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const {SERVER_DATA_YEAR, SERVER_DATA_TODAY} = require('./def');

function goldprice(): React.Component {

  class GoldPrice extends Component {
    constructor(props) {
      super(props)
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
        date: '',
      };
    }
    componentDidMount() {
      this.fetchData();
    }

    fetchData() {
      fetch(SERVER_DATA_TODAY)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.price),
            loaded: true,
          });
        })
        .done();
      }

    render() {
      if (!this.state.loaded) {
        return this.renderLoadingView();
      }

      return (
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderHeader={this.renderHeader}
            renderRow={this.renderPrice}
            style={styles.listview}
            />
        </View>
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
          <Text style={styles.date}>Today is %%%%</Text>
        </View>
      )
    }
    renderPrice(price) {
      return (
        <View style={styles.container}>
          <Text style={styles.time}>{price.hour}:{price.minute}</Text>
          <Text style={styles.price}>{price.buy}</Text>
          <Text style={styles.price}>{price.sell}</Text>
        </View>
      );
    }
  }

  return GoldPrice
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
});

module.exports = goldprice;
