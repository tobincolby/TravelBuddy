import * as React from 'react';
import { Button, Platform, View, Text, StyleSheet, KeyboardAvoidingView, TextInput, AsyncStorage, ScrollView, Dimensions } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import {cRed, cBlack, cWhite, cLightBlue} from "./App"
import StandardButton from './StandardButton';
import AppNavigator from './App.js';
import moment from "moment";

export default class TripOptionsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  selectedStartDate: null,
			selectedEndDate: null,
			originCity: null,
			dest1City: null,
			dest2City: null,
			dest3City: null,
			dest4City: null,
			duration1: null,
			duration2: null,
			duration3: null,
			duration4: null
		};
		this.onDateChange = this.onDateChange.bind(this);
		this.onSubmitOptions = this.onSubmitOptions.bind(this);
	}

	onDateChange(date, type) {
		if (type === 'END_DATE') {
		  this.setState({
			selectedEndDate: date,
		  });
		} else {
		  this.setState({
			selectedStartDate: date,
			selectedEndDate: null,
		  });
		}
	}

	onSubmitOptions() {
		console.log(this.state);
		global.destinations = [];
		global.durations = [];
		if (this.state.selectedStartDate != null && 
			this.state.selectedEndDate != null &&
			this.state.originCity != null && 
			this.state.dest1City != null) {
				var start = this.state.selectedStartDate.format("YYYY-MM-DD");
				var end = this.state.selectedEndDate.format("YYYY-MM-DD");
				if (this.state.dest1City != null && this.state.dest1City != "") {
					global.destinations.push("SEA");
					global.durations.push(this.state.duration1);
				}
				if (this.state.dest2City != null && this.state.dest2City != "") {
					global.destinations.push("PHL");
					global.durations.push(this.state.duration2);
				}
				if (this.state.dest3City != null && this.state.dest3City != "") {
					global.destinations.push("DFW");
					global.durations.push(this.state.duration3);
				}
				if (this.state.dest4City != null && this.state.dest4City != "") {
					global.destinations.push(this.state.dest4City);
					global.durations.push(this.state.duration4);
				}
				
				global.origin = "ATL";
				global.startDate = start.toString();
				global.endDate = end.toString();
				global.numDays = moment(end).diff(start, 'days');
				console.log(global.numDays); 
				this.props.navigation.navigate('TripPage', {startDate: start.toString(),
				endDate: end.toString(), origin: "ATL",
				destinations: global.destinations, durations: global.durations});
				console.log("navigating");
			}
		else {
			console.log("Fields not complete");
		}
	}

  	render() {
			AsyncStorage.removeItem('currentCart');
			const { selectedStartDate, selectedEndDate, originCity, dest1City} = this.state;
			console.log(this.state);
			const minDate = new Date(); // Today
			const maxDate = new Date(2020, 12, 30);
			const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
			const endDate = selectedEndDate ? selectedEndDate.toString() : '';
			const origin = originCity ? originCity.toString() : '';
			const dest = dest1City ? dest1City.toString() : '';
			const theWarning = startDate != '' && endDate != '' && origin != '' && dest != '' ? '' : 'Please complete all fields'; //Please complete all fields
			let warnStyle = theWarning == '' ? 'none' : 'flex';
			//let enableContinue = theWarning == '' ? 0.6 : 1;
			return (
				<ScrollView>
				<KeyboardAvoidingView style={styles.container} enabled behavior={'position'}>
					<View style={[{height: "auto"}, styles.titleHolder]}>
							<Text style={styles.title}>Start your trip </Text>
							<Text style={[styles.warning, {display: warnStyle}]}>{theWarning}</Text>
					</View>

					
					
						{/* <Text style={styles.normal}>Please select your trip dates:</Text> */}
						<View style={styles.calendarContainer}>
							<CalendarPicker style={{}}
							startFromMonday={true}
							allowRangeSelection={true}
							minDate={minDate}
							maxDate={maxDate}
							todayBackgroundColor="#1D71F3"
							selectedDayColor="#FAA916"
							selectedDayTextColor="white"
							onDateChange={this.onDateChange}
							width={Dimensions.get("window").width-60}
							
							/>
							</View>
					
							<View>
							{/* <Text>SELECTED START DATE:{ startDate }</Text> */}
							{/* <Text>SELECTED END DATE:{ endDate }</Text> */}
							</View>

							<View style={{}}>
								<TextInput
									style={styles.textInput}
									placeholder="Origin"
									onChangeText={(city) => this.setState({originCity: city})}>
								</TextInput>
								<View style={{flexDirection: "row"}}>
									<TextInput
										style={styles.textInput}
										placeholder="Destination 1"
										onChangeText={(city) => this.setState({dest1City: city})}>
									</TextInput>
									<TextInput
										style={styles.textInput}
										placeholder="Duration"
										onChangeText={(city) => this.setState({duration1: city})}>
									</TextInput>
								</View>
								<View style={{flexDirection: "row"}}>
									<TextInput
										style={styles.textInput}
										placeholder="Destination 2"
										onChangeText={(city) => this.setState({dest2City: city})}>
									</TextInput>
									<TextInput
										style={styles.textInput}
										placeholder="Duration"
										onChangeText={(city) => this.setState({duration2: city})}>
									</TextInput>
								</View>
								<View style={{flexDirection: "row"}}>
									<TextInput
										style={styles.textInput}
										placeholder="Destination 3"
										onChangeText={(city) => this.setState({dest3City: city})}>
									</TextInput>
									<TextInput
										style={styles.textInput}
										placeholder="Duration"
										onChangeText={(city) => this.setState({duration3: city})}>
									</TextInput>
								</View>
								<View style={{flexDirection: "row"}}>
									<TextInput
										style={styles.textInput}
										placeholder="Destination 4"
										onChangeText={(city) => this.setState({dest4City: city})}>
									</TextInput>
									<TextInput
										style={styles.textInput}
										placeholder="Duration"
										onChangeText={(city) => this.setState({duration4: city})}>
									</TextInput>
								</View>
							</View>

							<StandardButton style={{opacity: theWarning == '' ? 1 : 0.6}}
							onPress={this.onSubmitOptions}>
								<Text style={styles.standardButton}> Continue</Text>
						</StandardButton>
				</KeyboardAvoidingView>
				</ScrollView>

			);
  	}
}
 
const styles = StyleSheet.create({
	container: {
	  backgroundColor: 'white',
		flexDirection: 'column',
		flex: 1,
		paddingLeft: 30,
		paddingRight: 30,
		height: '100%',
		paddingTop: 20
	},
	titleHolder: {
    justifyContent: "center",
		alignItems: "flex-start",
		height: 100
  },
  title: {
    textAlign: 'left',
    fontSize: Platform.OS === 'ios' ? 32 : 35,
    fontFamily: "Arial",
		color: "black",		
		fontWeight: Platform.OS === 'ios' ? 'bold' : 'regular',
	},
	warning: {
		color: '#3EAAFA',
		fontSize: Platform.OS === 'ios' ? 18 : 21,
		textAlign: 'left',
		marginTop: 7,
		marginBottom: 7,

		fontFamily: "Arial"
	 },
	calendarContainer: {
		borderRadius: 8,
		backgroundColor: '#F2F2F2',
		marginBottom: 18,
		fontFamily: "Arial",
		fontSize: 23,
		height: Platform.OS === 'ios' ? 280 : 340,
		overflow: "hidden"
		
	},
	textInput: {
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
    height: Platform.OS === 'ios' ? 60 : 70,
	marginBottom: Platform.OS === 'ios' ? 13 : 18,
	marginRight: Platform.OS === 'ios' ? 13: 18,
    fontFamily: "Arial",
    fontSize: Platform.OS === 'ios' ? 20 : 23,
    padding: 19,

  },
	background: {
	  backgroundColor: '#42cef4',
		flex: 1,
		
	},
	input: {
		margin: 15,
		height: 40,
		borderColor: '#7a42f4',
		borderWidth: 1
 },

 standardButton: {
	color: "#FFFFFF",
	fontSize: 25,
	fontFamily: "Arial",
	fontWeight: 'bold'
	
},
});