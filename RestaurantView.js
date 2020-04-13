import React, { Component } from "react";
import { View, Picker, Text, Linking, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Button, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import StarRating from 'react-native-star-rating'; 
import './global.js'
import RestaurantCard from "./RestaurantCard.js";

class RestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        error: false,
        refreshing: false,
        time: 30,
    };
    this.fetchRestaurants = this.fetchRestaurants.bind(this);
    this.params = this.props.params;
    this.fetchRestaurants();
  }

  fetchRestaurants(){
    var {flights, price} = JSON.parse("{" +this.params.trip + "}");
    var url = global.url + 'restaurants/getByCity?destNum=' + (flights.length - 1);
    for (var i = 0; i < flights.length - 1; i++) {
      url += "&dest" + i + "=" + flights[i].destination_city;
    }
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                isLoading: false,
                error: false,
                data: response.business,
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
    console.log(this.state.data);

    return (
      <View style={{ flex: 1 }}>
        <FlatList
        data={this.state.data}
        renderItem={({ item: { name, id,
          rating,
          price,
          display_phone,
          url,
          photos,
          location: {
              address1,
              city,
              state,
              postal_code,
          } } }) => {
            var thePrice = 0;
            if (price == "$") {
              thePrice = 1;
            } else if (price == "$$") {
              thePrice = 2;
            } else if (price == "$$$") {
              thePrice = 3;
            } else {
              thePrice = 4;
            }

            return (
              <RestaurantCard showAdd={true} name={name} address={address1 + "," + city} rating={rating} phone={display_phone} sourceURL={photos && photos.length > 0 ? photos[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOH9vW49J77rJpXQ9wDM5Pgc8b6DOt2-ZuUUVuhEb7WR5IThl"} price={thePrice} addAction={() => {
                this.addToCart({ category: "food", name, id: id,
                rating,
                price,
                display_phone,
                url,
                photos,
                location: {
                    address1,
                    city,
                    state,
                    postal_code,
                }});
              }} />
        );
      }
          }
        refreshing={this.state.refreshing}
        keyExtractor={({item: id}) => id}
        onRefresh={this.handleRefresh}
      />
      </View>
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
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  miniHeader: {
    fontSize: 15,
    fontWeight: "bold",
  }
});

export default RestaurantView;
