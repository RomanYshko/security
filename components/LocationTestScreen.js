import React, { Component, useDeferredValue } from 'react';
import ReactDOM from 'react-dom/client';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import axios from 'axios';
import { connect } from 'react-redux';

class LocationTestScreen extends React.Component{
    
    constructor(props){
        super(props);
        this.state = { isTracking: false };
    }
    
    componentDidMount(){
        
        // ** Request permissions
        Location.requestForegroundPermissionsAsync();
        Location.requestBackgroundPermissionsAsync();

        // *** Register task
        const LOCATION_TRACKING = 'location-tracking';
        TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
            if (error) {
                console.log('LOCATION_TRACKING task ERROR:', error);
                return;
            }
            if (data) {
                this.setState({ isTracking: true });
                const { locations } = data;
                let lat = locations[0].coords.latitude;
                let long = locations[0].coords.longitude;
        
                l1 = lat;
                l2 = long;
        
                console.log(
                    `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
                );

                // Create axios instance
                const axiosInstance = axios.create({
                    baseURL: 'http://sp.p-yakymenko.com',
                    headers: {'Authorization': 'Bearer '+ this.props.authToken}
                });

                // Make call to open (create) shift
                axiosInstance.post('/mobile/guard/test_log_position', null, {params: {
                    type: 'background', lat: lat, lon: long} } );
            }
        });

    }

    // FOREGROUND location tracking
    startLocationTracking(){
        console.log('start tracking function called');
        
        // ** Start tracking
        Location.watchPositionAsync({
            accuracy: Location.Accuracy.High,
            timeInterval: 2500,
            distanceInterval: 0
            
          },
            location => {
                console.log('update location!', location.coords.latitude, location.coords.longitude)

                 // Create axios instance
                const axiosInstance = axios.create({
                    baseURL: 'http://sp.p-yakymenko.com',
                    headers: {'Authorization': 'Bearer '+ this.props.authToken}
                });

                // Make call to open (create) shift
                axiosInstance.post('/mobile/guard/test_log_position', null, {params: {
                    type: 'foreground', lat: location.coords.latitude, lon: location.coords.longitude} } );

            }); // end callback for watchPositionAsync
    }

    /**
     * BACKGROUND start location tracking
     */
    startLocationBackgroundTracking(){
        // Start background tracking
        const LOCATION_TRACKING = 'location-tracking';
        Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
            accuracy: Location.Accuracy.High,
            timeInterval: 2500,
            distanceInterval: 0,
            showsBackgroundLocationIndicator: true,
            foregroundService: {
                notificationTitle: "App is running",
                notificationBody: "Location tracking",
            }
        });
    }

    /**
     * Stop location tracking (background)
     */
    stopLocationBackgroundTracking(){
        const LOCATION_TRACKING = 'location-tracking';
        Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
        this.setState({ isTracking: false });
    }

    /**
     * Start/stop background tracking button
     */
    uiStartStopTrackingButton(){
        if(this.state.isTracking == true){
            return (<Button title="Stop background tracking" color="red" onPress={() => this.stopLocationBackgroundTracking() } style={{ flex: 1, alignItems: "center", justifyContent: "center" }} ></Button>);
        } else {
            return (<Button title="Start background tracking" color="green" onPress={() => this.startLocationBackgroundTracking() } style={{ flex: 1, alignItems: "center", justifyContent: "center" }} ></Button>);
        }
    }


    checkBackgroundStatus(){
        const LOCATION_TRACKING = 'location-tracking';
        TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((status) =>{ this.setState({ isTracking: status }); });
        
    }

    checkStatusLabel(){
        if(this.state.isTracking == true){
            return (<Text>True</Text>);
        } else {
            return (<Text>False</Text>);
        }
    }

    render(){
        const styles = StyleSheet.create({
            container: {
              flex: 1,
              
              alignItems: 'center',
              justifyContent: 'center',
            }
        });

        

        // <Button title="Start foreground tracking" style={{ flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 10 }} color="green" onPress={() => this.startLocationTracking() }></Button>
        return(

            <View style={styles.container}>
                { this.uiStartStopTrackingButton() }                
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
      authToken: state.test.value.testKey
    };
  };


  export default connect(mapStateToProps)(LocationTestScreen);