import React from 'react';
import { Image, View, Text } from 'react-native';
import {TabBarTop, TabNavigator} from "react-navigation";
import styles from '../PolicyInfoStyles';
import OverviewContainer from '../../Overview/OverviewContainer';
import DocumentsContainer from '../../Documents/DocumentsContainer';
import QuoteContainer from '../../Quote/QuoteContainer';

OverviewContainer.navigationOptions = {
    title: `Overview`
};

DocumentsContainer.navigationOptions = {
    title: `Documents`

};

QuoteContainer.navigationOptions = {
    title: `Quote`

};

const TabNavigation = TabNavigator({
    Overview: {screen: OverviewContainer},
    Documents: {screen: DocumentsContainer},
    Quote: {screen: QuoteContainer},
},{
    swipeEnabled: true,
    tabBarComponent: TabBarTop,
    initialRouteName: 'Quote',
    tabBarPosition: 'top',
    tabBarOptions: {
        indicatorStyle: styles.tab_active_indicator,
        labelStyle: styles.tab_label,
        style: styles.tab_bar,
        upperCaseLabel: false
    }
});

export default TabNavigation;