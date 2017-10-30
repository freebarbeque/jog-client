import * as React from 'react';
import {  View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import styles, { SELLERS_LOGOS, ARROW_THIN, QUOTE_FEATURE_ICON } from '../AnnualQuotesStyles';


export const renderFeatures = () => {
    const features = ['Legal expenses', 'Personal accident', 'Windscreen cover', 'Courtesy car'];

    return features.map((feature, i) => (
        <View style={[styles.feature, i === 0 && styles.first_feature]} key={i}>
            <Image style={styles.feature_icon} source={QUOTE_FEATURE_ICON} />
            <Text style={styles.feature_text}>{feature}</Text>
        </View>
    ))

}

const CurrentQuote = ({showList, currentQuote}) => {
    return (
        <View style={styles.curent_quote_container}>
            <TouchableOpacity style={styles.current_back} onPress={() => showList()}>
                <Image style={styles.arrow_thin} source={ARROW_THIN} />
                <Text style={styles.current_back_text} >BACK TO RESULTS</Text>
            </TouchableOpacity>
            <View style={styles.current_info_container}>
                <View style={styles.current_seller_logo}>
                    <Image style={styles.current_seller_logo_img} source={SELLERS_LOGOS[currentQuote.ID].source} />
                </View>
                <View style={styles.current_seller_name}><Text style={styles.current_seller_name_text}>{currentQuote.name}</Text></View>
                <View style={styles.current_price_container}>
                    <View style={styles.current_annually_container}>
                        <Text style={styles.current_price_pound}>{`£${currentQuote.annualy.split(".")[0]}`}</Text>
                        <Text style={styles.current_price_cent}>{`.${currentQuote.annualy.split(".")[1]}`}</Text>
                        <Text style={styles.current_amount_label}>{`ANNUALLY`}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.current_excess_conainer}>
                        <Text style={styles.current_excess_amount}>{`£${currentQuote.excess}`}</Text>
                        <Text style={styles.current_amount_label}>{`EXCESS`}</Text>
                    </View>
                </View>
                <View style={styles.features_list}>
                    { renderFeatures() }
                </View>
                <View style={styles.see_more}>
                    <Text style={styles.see_more_text}>See more ></Text>
                </View>
            </View>
        </View>
    )
}

export default CurrentQuote;