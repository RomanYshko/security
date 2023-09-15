import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {testKey: '', login: 'test@guard.com', password: 'Test123!', attemptingLogin: false, errorLogidin: ''} // change login & password back to null
};

export const TestSlice = createSlice({
    name: "TestSlice",
    initialState,
    reducers: {
        setToken: (state, testparam) => {
            state.value.testKey = testparam.payload;
        },
        setLogin: (state, loginValue) => {
            state.value.login = loginValue.payload;
        },
        setPassword: (state, passwordValue) => {
            state.value.password = passwordValue.payload;
        },
        logoutReducer: (state) => {
            state.value.testKey = null;
            state.value.login = null;
            state.value.password = null;
            state.value.errorLogidin = null;
            // console.log('logout reducer');
        },
        setAttemptingLoginTrue: (state) => {
            state.value.attemptingLogin = true;
            console.log('logging in true');
        },
        setAttemptingLoginFalse: (state) => {
            state.value.attemptingLogin = false;
            console.log('logging in false');
            state.value.errorLogidin = 'Login or Password invalid';
        },
        setErrorLogidin: (state) => {
            state.value.errorLogidin = null;
        }
    }
});

export const { setToken, setLogin, setPassword, logoutReducer, setAttemptingLoginTrue, setAttemptingLoginFalse, setErrorLogidin } = TestSlice.actions;

export default TestSlice.reducer;