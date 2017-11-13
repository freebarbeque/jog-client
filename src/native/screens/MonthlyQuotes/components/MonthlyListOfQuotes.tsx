import * as React from 'react';
import {  View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../MonthlyQuotesStyles';
import { SELLERS_LOGOS } from '../../AnnualQuotes/AnnualQuotesStyles';
import { ARROW_BOLD } from '../../AnnualQuotes/AnnualQuotesStyles';

interface IProps {
    quotes: [{
        name: string,
        extras: number,
        excess: number,
        annualy: string,
        ID: string,
        monthly: {
            price: string,
            excess: string,
            upfront: string
        }
    }];
    showQuote: Function
}
   
const renderQuote = (quote, i, showQuote) => {
    
    return (
        <TouchableOpacity style={styles.quote} key={i} onPress={() => showQuote(quote)}>
            <View style={styles.quote_info}>
                <View style={styles.seller_logo}>
                    <Image style={styles.seller_logo_img} source={SELLERS_LOGOS[quote.ID].source} />
                </View>
                <View style={styles.price_container}>
                    <Text style={styles.price_pound}>
                        {`£${quote.monthly.price.split('.')[0]}`}
                        <Text style={styles.price_cent}>{`.${quote.monthly.price.split('.')[1]}`}</Text>
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.excess_conainer}>
                    <Text style={styles.excess_amount}>{`£${quote.monthly.excess}`}</Text>
                    <Text style={styles.excess_amount_label}>{`EXCESS`}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.excess_conainer}>
                    <Text style={styles.excess_amount}>{`£${quote.monthly.upfront}`}</Text>
                    <Text style={styles.excess_amount_label}>{`UPFRONT`}</Text>
                </View>
                <Image style={styles.arrow_right} source={ARROW_BOLD} />
            </View>
            <View style={styles.quote_bottom}>
                <Text style={styles.bottom_text}>{quote.name.toUpperCase()}</Text>
                <Text style={styles.bottom_text}>{quote.extras + ` EXTRAS`}</Text>
            </View>
        </TouchableOpacity>
    )
}

const MonthlyListOfQuotes: React.StatelessComponent<IProps> = ({quotes, showQuote}) => {
    return (
        <View style={styles.annual_list_of_quotes}>
            {quotes.map((quote, i) => renderQuote(quote, i, showQuote))}
            <View style={styles.see_more}>
                <Text style={styles.see_more_text}>See more ></Text>
            </View>
        </View>
    )
}

export default MonthlyListOfQuotes;