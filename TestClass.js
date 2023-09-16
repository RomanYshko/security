import React, { Component } from 'react';

import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

// Axios
import axios from 'axios';

//React navigation
import { useNavigation } from '@react-navigation/native';

// Redux
// import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';

// Test class
class Test extends React.Component{
    constructor(){
        super();
    
        this.state = {
          isRed: false
        }
    
      } // end constructor
    
      componentDidMount(){
        this.fetchButtonColor();
        this.timer = setInterval(() => this.fetchButtonColor(), 1000);
        console.log('component successfully mounted');
      }
    
      componentWillUnmount(){
        clearInterval(this.timer);
        this.timer = null;
      }
    
      changeColor(){
        console.log('change color');
        //this.setState({ isRed: !this.state.isRed });

        axios.get('http://sp.p-yakymenko.com/react/invert_test_value').then((response) => {
          this.fetchButtonColor();
        });
      }
    
      fetchButtonColor(){
        
        axios.get('http://sp.p-yakymenko.com/react_test').then((response) => {
          this.setState({ isBlack: response.data.button_is_black });
        });
      }


      testButton(){
        if(this.state.isBlack == true){
          return <Button title="test button 2" color="red" onPress={ this.changeColor.bind(this) }></Button>;

        } else {
          return <Button title="test button 2" color="grey" onPress={ this.changeColor.bind(this) }></Button>;
        }
        
      }

      loginButton(){
          if(this.props.testToken == 'test_value_initial'){
            return <Button title="To login" onPress={() => this.props.navigation.navigate('LoginScreen')}></Button>;
          } else {

          }
          

        
        
      }
      

      render(){

        
        
        // Styling
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }
        });


          
        return (
          <View style={styles.container}>
            <Text>Initial Test Component</Text>
            <Text>{ this.props.testToken }</Text>

            { this.testButton() }
            
            { this.loginButton() }
              
          </View>
        );
          
      
        
      }
}

const mapStateToProps = (state) => {
  return {
    testToken: state.test.value.testKey,
  };
};
  
export default connect(mapStateToProps)(Test);