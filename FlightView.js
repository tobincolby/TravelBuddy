import React, { Component } from "react";
import { View, Platform, Text, TouchableOpacity, FlatList, StyleSheet, Linking, ActivityIndicator, Button, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import './global.js'
import FlightCard from "./FlightCard.js";
import SaveButton from "./SaveButton";
import { ScrollView } from "react-native-gesture-handler";

class FlightView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        error: false,
        refreshing: false,
        time: 30,
    };
    this.fetchFlights = this.fetchFlights.bind(this);
    this.params = this.props.params;
    this.fetchFlights();
  }
  //flights?origin=ATL&dest=JFK&departDate=2019-09-23
  fetchFlights(){
    var url = global.url + 'flights?origin=' + this.params.origin +  "&startDate=" + this.params.startDate + '&endDate=' + this.params.endDate + "&destinationNumber="+ this.params.destinations.length;
    for (var i = 0; i < this.params.destinations.length; i++) {
      url += "&destination" + i + "=" + this.params.destinations[i] + "&duration" + i + "=" + this.params.durations[i];
    }
    console.log(url)
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                isLoading: false,
                error: false,
                data: response,
                refreshing: false,
                time: 30,
            }, function () {

            });
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
                error: true
            })
        });
    }


  render() {
    if (this.state.error) {
        return (
            <View style={{ flex: 1, paddingTop: 25, alignSelf: "center" }}>
                <Icon name="error" size={75} color="#F00" />
                <Text style={{ alignSelf: "center", color: "#F00" }}>Error</Text>
            </View>
            );
    }
    if (this.state.isLoading) {
        return (
            <View style={{ flex: 1, paddingTop: 25 }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    // const { navigation } = this.props.navigation;
    // const startDate = navigation.state.getParam('startDate', '03-23-2019');
    // const endDate = navigation.state.getParam('endDate', '03-24-2019');
    // const origin = navigation.state.getParam('origin', 'ATL');
    // const destination = navigation.state.getParam('destination', 'NYC');
    global.trip = this.state.data;
    console.log(this.state.data);
    return (
      <ScrollView>
      <View style={{ flex: 1 }}>
        <Text style={styles.dayHeader}>Total Price: ${this.state.data.price}</Text>
        <FlatList
        data={this.state.data.flights}
        key={(item) => item.departure_date}
        renderItem={({ item: {departure_date, price, airline, origin_code, destination_code } }) => {
          // var diff = segmentsTo[segmentsTo.length-1]["arriveTimeUnix"] - segmentsTo[0]["departTimeUnix"];
          // var hours_diff = Math.floor(diff/3600);
          // var mins_diff = Math.floor((diff % 3600)/60);
          // var durationTo = hours_diff + "h " + mins_diff + "m ";
          
          // diff = segmentsBack[segmentsBack.length-1]["arriveTimeUnix"] - segmentsBack[0]["departTimeUnix"];
          // hours_diff = Math.floor(diff/3600);
          // mins_diff = Math.floor((diff % 3600)/60);
          // var durationBack = hours_diff + "h " + mins_diff + "m ";
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
      <View style={{padding: 25}}>
        <SaveButton></SaveButton>
      </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  link: {
    textDecorationLine: 'underline',
    color: "#00F",
    marginTop: 5,
    marginBottom: 5,
  },
  centerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  miniHeader: {
    fontSize: 15,
    fontWeight: "bold",
  },
  regularText: {
    fontSize: 15,
    fontWeight: "normal",
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
});

export default FlightView;
