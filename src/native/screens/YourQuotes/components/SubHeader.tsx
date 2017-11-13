import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';

import styles, { QUOTE_IMG } from '../YourQuotesStyles';

interface IProps {
    activeTab: string;
}
const renderAnnualQuotesSubHeader = () => {
    return (
        <View style={styles.sub_header_container}>
            <Image style={styles.title_img} source={QUOTE_IMG}/>
            <View style={styles.title}>
                <Text style={styles.title_placeholder}>CAR</Text>
                <Text style={styles.car_model}>{`Renault Megane\nXYZ 12345`}</Text>
            </View>
        </View>
    )
}

const renderMonthlyQuotesSubHeader = () => {
    return (
        <View style={styles.monthly_subheader}>
            <Image style={styles.monthly_img} source={QUOTE_IMG}/>
            <Text style={styles.car_monthly_model}>{`Renault Megane XYZ 12345`}</Text>
        </View>
    )
}

const SubHeader: React.StatelessComponent<IProps> = ({activeTab}) => activeTab === 'AnnualQuotes' ? renderAnnualQuotesSubHeader() : renderMonthlyQuotesSubHeader()

export default SubHeader;
