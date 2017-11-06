import * as React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';

import styles, {RED_SPINNER, AUTO_IMG} from '../GettingQuotesStyles';
import Header from './GettingQuotesHeader';
import LinearGradient from 'react-native-linear-gradient';
import {YOUR_QUOTES_ROUTE} from '../../../nav/main/routes';

interface Props {
    navigation: any;
}

const GettingQuotes:React.StatelessComponent<Props> = (props) => {
    const {navigation} = props;
    return (
        <LinearGradient colors={['#181E3A', '#212A4A']} style={styles.getting_quotes_container}>
        <Header navigation={navigation} title={'Getting Quotes'}/>
        <View style={styles.wait_container}>
            <Image style={styles.car_img} source={AUTO_IMG} />
            <Text style={styles.placeholder}>CAR</Text>
            <Text style={styles.car_model}>Renault Megane</Text>
            <Text style={styles.car_model}>XYZ 12345</Text>
            <Image style={styles.spinner_img} source={RED_SPINNER} />
            <TouchableOpacity onPress={() => navigation.navigate(YOUR_QUOTES_ROUTE)}>
                <Text style={styles.wait_text}>{`Please wait while\nwe find you the\nbest quotes on\nthe market`}</Text>
            </TouchableOpacity>
        </View>
    </LinearGradient>
    )
}

export default GettingQuotes;
