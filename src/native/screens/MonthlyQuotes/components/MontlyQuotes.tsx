import * as React from 'react';
import {  View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { renderTabs } from '../../AnnualQuotes/components/AnnualQuotes';
import styles, { ARROW_BOLD } from '../MonthlyQuotesStyles';
import MonthlyListOfQuotes from './MonthlyListOfQuotes';
import MonthlyCurrentQuote from './MonthlyCurrentQuote';

interface IProps {
    navigation: any;
    quotes: [any];
    showQuote: Function;
    currentQuote: any;
    showList: Function;
}

const renderListOrItem = (quotes, showQuote, showList, currentQuote) => {
    if (currentQuote.name) {
        return <MonthlyCurrentQuote showList={showList} currentQuote={currentQuote}/>
    } else {
        return (
            <View>
                {renderTabs()}
                <View style={styles.sort_section}>
                    <Text style={styles.sort_title}>Sort by</Text>
                    <Image style={styles.sort_arrow} source={ARROW_BOLD} />
                </View>
                <MonthlyListOfQuotes quotes={quotes} showQuote={showQuote}/>
            </View>
        )
    }
    
}

const MonthlyQuotes: React.StatelessComponent<IProps> = (props) => {
    const {quotes, showQuote, currentQuote, showList} = props;
    return (
        <ScrollView style={styles.annual_quotes_container}>
            {renderListOrItem(quotes, showQuote, showList, currentQuote)}
        </ScrollView>
    )
};

export default MonthlyQuotes;