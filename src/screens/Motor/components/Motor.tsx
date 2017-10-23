import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from '../MotorStyles';
import Header from '../../Header/HeaderContainer';
import MotorPoliciesList from './MotorPoliciesList';

const Motor = ({navigation}) => {
    return (
        <View style={styles.motor_container}>
            <Header navigation={navigation} />
            <View style={styles.sub_header}>
                <Text style={styles.sub_header_text}>Motor Policies</Text>
            </View>
            <MotorPoliciesList navigation={navigation} />
        </View>
    )
};

export default Motor;