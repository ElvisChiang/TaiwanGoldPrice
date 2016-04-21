import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const {SERVER_DATA_YEAR} = require('./def');

class Year extends Component {
  constructor(props) {
    super(props)
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
    fetch(SERVER_DATA_YEAR)
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPrice.bind(this)}
        style={styles.listview}
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
  renderPrice(price) {
    return (
      <View style={styles.container}>
        <Text style={styles.date}>{price.date}</Text>
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
    backgroundColor: '#FFFFFF',
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
});

module.exports = Year;