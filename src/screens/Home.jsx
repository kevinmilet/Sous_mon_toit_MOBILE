import React from 'react';
import { View } from 'react-native';
import Calendar from '../components/Calendar/Calendar';
import Topbar from '../components/Topbar/Topbar';

const Home = () => {
    return(
        <View >
            <Topbar/>
            <Calendar/>
        </View>
    )
};

export default Home;
