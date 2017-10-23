import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import Header from '../../Header/HeaderContainer';
import styles from '../PoliciesStyles';
import renderPoliciesList from './PoliciesList';

const Policies = ({navigation}) => {
    return (
        <View style={styles.policies_container}>
            <Header navigation={navigation}/>
            <View style={styles.sub_header}>
                <Text style={styles.sub_header_text}>Dashboard</Text>
            </View>
            <ScrollView >
                {renderPoliciesList(navigation)} 
            </ScrollView>
        </View>
    )
}

export default Policies;
