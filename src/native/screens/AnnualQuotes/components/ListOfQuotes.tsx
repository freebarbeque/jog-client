import * as React from 'react';
import {  View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import styles, {ARROW_BOLD, SELLERS_LOGOS} from '../AnnualQuotesStyles';

interface IProps {
    quotes: [{}];
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
                        {`£${quote.annualy.split('.')[0]}`}
                        <Text style={styles.price_cent}>{`.${quote.annualy.split('.')[1]}`}</Text>
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.excess_conainer}>
                    <Text style={styles.excess_amount}>{`£${quote.excess}`}</Text>
                    <Text style={styles.excess_amount_label}>{`EXCESS`}</Text>
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

const ListOfQuotes = ({quotes, showQuote}) => {
    return (
        <View style={styles.annual_list_of_quotes}>
            {quotes.map((quote, i) => renderQuote(quote, i, showQuote))}
            <View style={styles.see_more}>
                <Text style={styles.see_more_text}>See more ></Text>
            </View>
        </View>
    )
}

export default ListOfQuotes;