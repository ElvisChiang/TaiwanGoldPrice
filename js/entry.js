
import React, {
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

class Entry extends Component {
  constructor(props) {
    super(props)
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
