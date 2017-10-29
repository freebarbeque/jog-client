import * as React from 'react';
import {  View, ScrollView, Text, Image } from 'react-native';
import styles, {ARROW_BOLD} from '../AnnualQuotesStyles';
import ListOfQuotes from './ListOfQuotes';

interface Props {
    navigation: any
}

export const renderTabs = () => {
    const tabs = [{title: 'COMPREHENSIVE', active: true}, {title: '3RD PARTY', active: false}, {title: '3RD + FIRE & THEFT', active: false}]
    return (
        <View style={styles.fake_tabs}>
        {tabs.map((tab, i)=> (
            <View key={i} style={[styles.fake_tab, tab.active && styles.active_tab]}>
                <Text style={[styles.fake_tab_title, tab.active && styles.active_title]}>{tab.title}</Text>
            </View>
        ))}
    </View>
    )
}
    


const AnnualQuotes = (props) => {
    const {quotes} = props;
    return (
        <ScrollView style={styles.annual_quotes_container}>
            { renderTabs() }
            <View style={styles.sort_section}>
                <Text style={styles.sort_title}>Sort by</Text>
                <Image style={styles.sort_arrow} source={ARROW_BOLD} />
            </View>
            <ListOfQuotes quotes={quotes} />
            
        </ScrollView>
    )
}

export default AnnualQuotes;