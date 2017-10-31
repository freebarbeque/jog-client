import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';

import styles from '../YourQuotesStyles';
import Header from '../../GettingQuotes/components/GettingQuotesHeader';
import TabNavigation from './YourQuotesTabs';
import SubHeader from './SubHeader';


interface Props {
    navigation: any;
    dispatch: Function;
    localState: any;
    activeTab: string;
    currentQuote: any;
}

export const renderSelectBtn = () => (
    <TouchableOpacity style={styles.select_btn}>
        <Text style={styles.select_text}>Select</Text>
    </TouchableOpacity>
)

const YourQuotes: React.StatelessComponent<Props> = (props) => {
    const {navigation, dispatch, localState, activeTab, currentQuote} = props;
    const tabNavProps:any = {dispatch, state: localState};
    return (
        <View style={styles.your_quotes_container}>
            <Header navigation={navigation} title={'Your Quotes'}/>
            <SubHeader activeTab={activeTab} />
            <TabNavigation navigation={addNavigationHelpers(tabNavProps)} />
            { currentQuote.name ? renderSelectBtn() : null }
        </View>
    )
}

export default YourQuotes;
