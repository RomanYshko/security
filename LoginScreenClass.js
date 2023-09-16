import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

// Style
import { GlobalStyle } from './assets/style/GlobalStyle';
import { LogidinStyle } from './assets/style/LogidinStyle';
// Axios
import axios from 'axios';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setToken, setLogin, setPassword, setAttemptingLoginTrue, setAttemptingLoginFalse, setErrorLogidin } from './store/TestSlice';

// App config
import appConfig from './config/appConfig.json';

function loginAttempt(dispatch, nav, login, password, attemptingLogin){
  
  // console.log(nav);
  // console.log(login);
  // console.log(password);

  // If there is another login attempt in progress - don't do anything
  if(attemptingLogin == true){
    console.log('block multi click');
    return null;
  }

  // Set 'login in progress' to true
  dispatch(setAttemptingLoginTrue());


  // Don't attempt login with empty credentials
  if(login == null || password == null || login.length == 0 || password.length == 0){
    dispatch(setAttemptingLoginFalse());
    return null;
  }
  
  // Ajax request & handle response
  const response = axios.post(appConfig.backendUrl + 'mobile/token/create', {
    email: login,
    password: password,
    device_name: login + '_device'
  }).then(response => {
    

    /* HANDLE SUCCESSFUL LOGIN */
    
    console.log('token',response.data);
    
    // Check response data if success
    // ...
    dispatch(setToken(response.data));
    dispatch(setAttemptingLoginFalse());
    dispatch(setErrorLogidin());

    // !! UNCOMMENT
    // nav.navigate('ShiftControlScreen');
    nav.navigate('LocationTestScreen');
  })
    .catch(function (error){
      
      /* HANDLE ERROR */
      dispatch(setAttemptingLoginFalse());
      if(error.toJSON().message == "Network Error"){
        // No connection
        console.log('No connection');
      } else if(error.toJSON().status == 422){
        // Invalid credentials
        console.log('Invalid credentials');
      }
    });
}

export default function LoginScreen({ navigation }) {
 
  // Остальной код остается без изменений
  const testToken = useSelector((state) => state.test.value.testKey);
  const login = useSelector((state) => state.test.value.login);
  const password = useSelector((state) => state.test.value.password);
  const attemptingLogin = useSelector((state) => state.test.value.attemptingLogin);
  const errorLogidin = useSelector((state) => state.test.value.errorLogidin)
  const dispatch = useDispatch();

  return (
    <View style={GlobalStyle.container}>
      <Image source={require('./assets/images/logo.png')} style={LogidinStyle.imageStyle} />
      <Text style={LogidinStyle.welcomeText}>Welcome back</Text>
      <Text style={LogidinStyle.errorText}>{errorLogidin}</Text>
      <TextInput
        type="text"
        style={LogidinStyle.inputAuth}
        onChangeText={(text) => {
          dispatch(setLogin(text)); 
          dispatch(setErrorLogidin());
        }}
        value={login}
        placeholder="Enter your login"
      />
    
      <TextInput
        type="text"
        style={LogidinStyle.inputAuth}
        onChangeText={(text) => {
          dispatch(setPassword(text)); 
          dispatch(setErrorLogidin());
        }}
        value={password}
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      <TouchableOpacity
        style={LogidinStyle.loginButtonContainer}
        onPress={() => loginAttempt(dispatch, navigation, login, password, attemptingLogin)}
      >
        <View style={LogidinStyle.loginButton}>
          <Text style={LogidinStyle.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}