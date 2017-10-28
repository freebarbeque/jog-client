import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styles, {QUOTE_SECTIONS_IMG} from '../QuoteStyles';
import QuoteSection from './QuoteSection';

interface Props {
    navigation: any;
    quoteSections: any;
    carQuestions: any;
    goTo: Function;
}

const Quote: React.StatelessComponent<Props> = (props) => { 
    const {quoteSections, carQuestions, goTo} = props;
    return (
        <View style={styles.quote_container}>
            <Text style={styles.quote_title}>Answer all sections to get a quote</Text>
            { 
                quoteSections.map((item, i) => (
                    <QuoteSection 
                        goTo={goTo}
                        title={item.title} 
                        key={i} 
                        carQuestions={item.title === 'Car' ? carQuestions : []}
                        percent={item.percent} 
                        questions={item.questions} 
                        image={QUOTE_SECTIONS_IMG[i]} 
                        route={item.route} 
                        navigation={props.navigation}/>
                ))
            }
        </View>
    )
}

export default Quote;
