import React from 'react';
import store from './src/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './src/components/MyTabs';

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <MyTabs />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
