import * as React from 'react';
import { View, Platform, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, TabBar, SceneMap, Label } from 'react-native-tab-view';
import FlightView from './FlightView'; 


export default class TabViewPage extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Flights' },
    ],
  };

  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
  }

TabFlightView = () => <FlightView params={this.params}/>;

 
  render() {
    return (
      <TabView
        
        style={{ styles}}
        color="green"
        navigationState={this.state}
        renderScene={SceneMap({
          first: this.TabFlightView,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width,
                          height: Dimensions.get('window').height }}
        renderTabBar={props =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#FAA916', padding: 2 }}
            style={{ backgroundColor: '#3EAAFA'}}
            renderLabel={({ route, focused, color }) => (
              <Text style={{marginTop: 10, marginBottom: 15, fontWeight: "bold", fontSize: Platform.OS === 'ios' ? 17 : 20, color: "white",}}>
                {route.title.toUpperCase()}
              </Text>
            )}
          />
        }
        
      />
    );
  }
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    color: "white"
  },
  tab: {
    color: "white",
    fontWeight: "bold"
  },
  active: {
    color: "white"
  }

});