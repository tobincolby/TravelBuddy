import React, { Component } from "react";
import { TouchableOpacity, Text, AsyncStorage, StyleSheet} from "react-native";
import { withNavigation } from "react-navigation";
import StandardButton from "./StandardButton";
import Icon from "react-native-vector-icons/FontAwesome";

class SaveButton extends React.Component {
  constructor(props) {
    super(props);
}
  saveItinerary() {
    try {
	  const finalValue = global.trip;
      console.log(finalValue);
      fetch(global.url + 'addTrip/', {
		method: 'POST',
        headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		  },
  
		  body: JSON.stringify({
			email: global.email,
			trip: finalValue,
			startDate: global.startDate,
		  }),
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON['success'] == 1) {
          console.log(responseJSON)
          this.props.navigation.navigate('HomePage');
        } else {
          console.log(responseJSON)
          console.log("Save trip failed");
        }
      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  render() {
    var that = this;
    return (
      <StandardButton
							onPress={() => that.saveItinerary(that)}>
								<Text style={styles.standardButton}>Save Flight</Text>
					</StandardButton>
    );
  }
}

const styles = StyleSheet.create({
  standardButton: {
    color: "#FFFFFF",
    fontSize: 25,
    fontFamily: "Arial",
    fontWeight: 'bold'
    
  },
});

export default withNavigation(SaveButton);