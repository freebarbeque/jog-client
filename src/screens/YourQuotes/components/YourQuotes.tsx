import * as React from 'react';
import { Text, View } from 'react-native';
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
}

const YourQuotes: React.StatelessComponent<Props> = (props) => {
    const {navigation, dispatch, localState, activeTab} = props;
    
    return (
        <View style={styles.your_quotes_container}>
            <Header navigation={navigation} title={'Your Quotes'}/>
            <SubHeader activeTab={activeTab} />
            <TabNavigation navigation={addNavigationHelpers({dispatch, state: localState})} />
        </View>
    )
}

export default YourQuotes;
