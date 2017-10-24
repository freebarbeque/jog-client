import * as React from 'react';
import {  Text, View } from 'react-native';
import TabNavigation from './TabNavigation';
import { addNavigationHelpers } from 'react-navigation';
import InfoHeader from './InfoHeader';
import styles from '../PolicyInfoStyles';

interface Props {
    dispatch: Function;
    nav: any;
    navigation: any
}


const PolicyInfo:React.StatelessComponent<Props> = ({dispatch, nav, navigation}) => {
    return (
        <View style={styles.policy_info_container}>
            <InfoHeader navigation={navigation}/>
            <TabNavigation navigationOptions={addNavigationHelpers({dispatch, ...nav})} />
        </View>
        
    )
};

export default PolicyInfo;