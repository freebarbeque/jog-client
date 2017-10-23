import * as React from 'react';
import { Text, View } from 'react-native';
import styles from '../WarrantiesStyles';
import Header from '../../Header/HeaderContainer';
import WarrantiesList from './WarrantiesList';

const Warranties = ({navigation}) => {
    return (
        <View style={styles.warr_container}>
            <Header navigation={navigation}/>
            <View style={styles.sub_header}>
                <Text style={styles.sub_header_text}>Warranties</Text>
            </View>
            <WarrantiesList />
        </View>
    )
}

export default Warranties;
