import * as React from 'react';
import { Text, View } from 'react-native';
import styles from '../YourQuotesStyles';
import Header from '../../GettingQuotes/components/GettingQuotesHeader';

interface Props {
    navigation: any;
}

const YourQuotes: React.StatelessComponent<Props> = (props) => {
    const {navigation} = props;
    return (
        <View style={styles.your_quotes_container}>
            <Header navigation={navigation} />
        </View>
    )
}

export default YourQuotes;
