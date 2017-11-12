import * as React from 'react';
import {  View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import styles, { SELLERS_LOGOS, ARROW_THIN, QUOTE_FEATURE_ICON } from '../MonthlyQuotesStyles';
import { renderFeatures } from '../../AnnualQuotes/components/CurrentQuote';

interface Props {
    showList: Function;
    currentQuote: any;
}

const CurrentQuote: React.StatelessComponent<Props> = ({showList, currentQuote}) => {
    return (
        <View style={styles.curent_quote_container}>
            <TouchableOpacity style={styles.current_back} onPress={() => showList()}>
                <Image style={styles.arrow_thin} source={ARROW_THIN} />
                <Text style={styles.current_back_text}>BACK TO RESULTS</Text>
            </TouchableOpacity>
            <View style={styles.current_info_container}>
                <View style={styles.current_seller_logo}>
                    <Image style={styles.current_seller_logo_img} source={SELLERS_LOGOS[currentQuote.ID].source} />
                </View>
                <View style={styles.current_seller_name}><Text style={styles.current_seller_name_text}>{currentQuote.name}</Text></View>
                <View style={styles.current_price_container}>
                    <View style={styles.current_annually_container}>
                        <Text style={styles.current_price_pound}>{`£${currentQuote.monthly.price.split('.')[0]}`}</Text>
                        <Text style={styles.current_price_cent}>{`.${currentQuote.monthly.price.split('.')[1]}`}</Text>
                        <Text style={styles.current_amount_label}>{`PER MONTH`}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.excess_upfront_container}>
                        <View style={styles.current_excess_conainer}>
                            <Text style={styles.current_excess_label}>{`EXCESS`}</Text>
                            <Text style={styles.current_excess_amount}>{`£${currentQuote.monthly.excess}`}</Text>
                        </View>
                        <View style={styles.horizontal_divider} />
                        <View style={styles.current_excess_conainer}>
                            <Text style={styles.current_upfront_label}>{`UPFRONT`}</Text>
                            <Text style={styles.current_excess_amount}>{`£${currentQuote.monthly.upfront}`}</Text>
                        </View>
                    </View>
                    
                </View>
                <View style={styles.features_list}>
                    {renderFeatures()}
                </View>
                <View style={styles.see_more}>
                    <Text style={styles.see_more_text}>See more ></Text>
                </View>
            </View>
        </View>
    )
}

export default CurrentQuote;