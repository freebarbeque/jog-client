import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../QuoteStyles';
import QuoteSection from './QuoteSection';

interface Props {
    navigation: any
}

const QUOTE_SECTIONS = [
    {
        title: 'Car',
        percent: 30,
        questions: 6,
        image: {source: require('../../../../img/questions_car.png'), style: styles.car_img}
    },{
        title: 'Driver',
        percent: 100,
        questions: 0,
        image: {source:  require('../../../../img/questions_driver.png'), style: styles.driver_img}
    },{
        title: 'Car',
        percent: 50,
        questions: 6,
        image: {source:  require('../../../../img/questions_usage.png'), style: styles.usage_img}
    }
]

const Quote: React.StatelessComponent<Props> = (props) => {    
    console.log('Quote props', props);
    return (
        <View style={styles.quote_container}>
            <Text style={styles.quote_title}>Answer all sections to get a quote</Text>
            { QUOTE_SECTIONS.map((item, i) => <QuoteSection title={item.title} key={i} percent={item.percent} questions={item.questions} image={item.image} />) }
        </View>
    )
}

export default Quote;
