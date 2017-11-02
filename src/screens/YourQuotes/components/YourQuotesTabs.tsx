import React from 'react';
import { Image, View, Text } from 'react-native';
import {TabBarTop, TabNavigator} from "react-navigation";
import styles from '../YourQuotesStyles';
import AnnualQuotes from '../../AnnualQuotes/AnnualQuotesContainer';
import MonthlyQuotes from '../../MonthlyQuotes/MonthlyQuotesContainer';

AnnualQuotes.navigationOptions = {
    title: 'Annual'
}

MonthlyQuotes.navigationOptions = {
    title: 'Monthly',
    tabBarOnPress: ({route, index}) => undefined
}



export default TabNavigator({
    AnnualQuotes: {screen: AnnualQuotes},
    MonthlyQuotes: {screen: MonthlyQuotes},
},{
    swipeEnabled: true,
    tabBarComponent: TabBarTop,
    initialRouteName: 'AnnualQuotes',
    tabBarPosition: 'top',
    tabBarOptions: {
        indicatorStyle: styles.tab_active_indicator,
        labelStyle: styles.tab_label,
        style: styles.tab_bar,
        upperCaseLabel: false
    }
});