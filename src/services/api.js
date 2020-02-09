// showLastCommitMessageForThisLibrary.js
import { create } from 'apisauce'
import AsyncStorage from '@react-native-community/async-storage';

// define the api
const api = create({
    baseURL: 'https://day-manager-b.herokuapp.com'
    // baseURL: 'localhost:4000'
})

api.addAsyncRequestTransform(async (request) => {
    const token = await AsyncStorage.getItem('@MyTDays:token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }

})

api.addResponseTransform(response => {
    if (!response.ok) {
        throw response;
    }
})

export default api;