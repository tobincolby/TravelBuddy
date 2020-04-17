import React, { Component } from "react";
import { View, NavigationActions, Platform, Text, FlatList, Image, StyleSheet, Linking, Alert, Button, ScrollView, AsyncStorage, Dimensions } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import StarRating from 'react-native-star-rating';
import FlightCard from "./FlightCard.js";
import RestaurantView from "./RestaurantView.js";

import SmallElement from "./SmalllElement.js";
import SaveButton from "./SaveButton";
import moment from "moment";
import { TabView, TabBar, SceneMap, Label } from 'react-native-tab-view';


const cDarkBlue = "#1D71F3";
const cLightBlue = "#3EAAFA";
const cBlack = '#3D3D3D';
const cRed = "#ED6A5A";
const cOrange = "#FAA916";
const cWhite = "#FFFFFF";



class ItineraryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Flights' },
        { key: 'second', title: 'Food'},
      ],
    };
    this.params = this.props.navigation.state.params;
    console.log("Hi");
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Your Trip',
    headerStyle: {
      backgroundColor: cLightBlue,
      elevation: 0,
      shadowOpacity: 0,
      paddingTop: 15,
      headerTintColor: "#FFFFFF"
    },
    headerRight: navigation.state.params.showSave ? (<SaveButton/>) : null,
    headerLeftContainerStyle: {
      marginLeft: 5,
    },
    headerTintColor: 'white',
  });

FoodTabView = () => <RestaurantView params={this.params}/>;

TabFlightView = () => {
  let {flights, price } = JSON.parse("{" + this.params.trip +"}");

  return (
    <ScrollView>
    <View style={{ flex: 1, paddingBottom: 30 }}>
      <Text style={styles.dayHeader}>Total Price: ${price}</Text>
      <FlatList
      data={flights}
      key={(item) => item.departure_date}
      renderItem={({ item: {departure_date, price, airline, origin_code, destination_code } }) => {

        return (
          <View style={Platform.OS === 'ios' ? {paddingHorizontal: 20} : {}}>
              <FlightCard 
                showAdd={false}
                first_dep_airport={origin_code}
                first_land_airport={destination_code}
                aDepartDate={departure_date}
                numStopsTo={1}
                airline={airline}
                price={price == "Not Available" ? "" : price}
                >
            </FlightCard> 
          </View>
          
        );
      }}
      refreshing={this.state.refreshing}
      keyExtractor={({item: tripid}) => tripid}
      onRefresh={this.handleRefresh}
    />
    </View>
    </ScrollView>
  );

}


  render() {
    if (global.email == '') {
      this.props.navigation.navigate('Welcome');
    }
    // console.log(this.props.navigation.state.params.trip);

    return (
      <TabView
        
        style={{ styles}}
        color="green"
        navigationState={this.state}
        renderScene={SceneMap({
          first: this.TabFlightView,
          second: this.FoodTabView,
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
  global: {
    backgroundColor: "#3EAAFA",
    width: "100%",
    height: "100%"
  },
  wrapper: {
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10,
    paddingVertical: 20,
    height: "100%"

  },
  dayHeader: {
    // borderWidth: 1,
    // borderColor: "#DDDDDD",
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 28,

  },
  elementHolder: {
    padding: 30,
    paddingTop: 10
  },
  connector: {
    height: 30,
    width: 25,
    borderRightWidth: 1,
    marginVertical: 10,
    borderColor: "#BBBBBB"
  }

});

export default ItineraryScreen;