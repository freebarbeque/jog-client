import * as React from 'react';
import {  View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import styles, {ARROW_BOLD} from '../AnnualQuotesStyles';
import ListOfQuotes from './ListOfQuotes';
import CurrentQuote from './CurrentQuote';

interface Props {
    navigation: any;
    quotes: [any];
    showQuote: Function;
    currentQuote: any;
    showList: Function;
}

export const renderTabs = () => {
    const tabs = [{title: 'COMPREHENSIVE', active: true}, {title: '3RD PARTY', active: false}, {title: '3RD + FIRE & THEFT', active: false}]
    return (
        <View style={styles.fake_tabs}>
        {tabs.map((tab, i) => (
            <View key={i} style={[styles.fake_tab, tab.active && styles.active_tab]}>
                <Text style={[styles.fake_tab_title, tab.active && styles.active_title]}>{tab.title}</Text>
            </View>
        ))}
    </View>
    )
}

const renderListOrItem = (quotes, showQuote, showList, currentQuote) => {
    if (currentQuote.name) {
        return <CurrentQuote showList={showList} currentQuote={currentQuote}/>
    } else {
        return (
            <View>
                {renderTabs()}
                <View style={styles.sort_section}>
                    <Text style={styles.sort_title}>Sort by</Text>
                    <Image style={styles.sort_arrow} source={ARROW_BOLD} />
                </View>
                <ListOfQuotes quotes={quotes} showQuote={showQuote}/>
            </View>
        )
    }
    
}

const AnnualQuotes: React.StatelessComponent<Props> = (props) => {
    const {quotes, showQuote, currentQuote, showList} = props;
    return (
        <ScrollView style={styles.annual_quotes_container}>
            {renderListOrItem(quotes, showQuote, showList, currentQuote)}
        </ScrollView>
    )
}

export default AnnualQuotes;