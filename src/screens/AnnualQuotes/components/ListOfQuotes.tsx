import * as React from 'react';
import {  View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import styles, {ARROW_BOLD, SELLERS_LOGOS} from '../AnnualQuotesStyles';

interface Props {
    quotes: [{}]
}


    
const renderQuote = (quote, i) => {
    
    return (
        <TouchableOpacity style={styles.quote} key={i}>
            <View style={styles.quote_info}>
                <View style={styles.seller_logo}>
                    <Image style={styles.seller_logo_img} source={SELLERS_LOGOS[quote.ID].source} />
                </View>
                <View style={styles.price_container}>
                    <Text style={styles.price_pound}>
                        {`£${quote.annualy.split(".")[0]}`}<Text style={styles.price_cent}>{`.${quote.annualy.split(".")[1]}`}</Text>
                    </Text>
                    <Text style={styles.excess_label}>{`EXCESS`}</Text>
                </View>
                <View style={styles.divider} />
                <View>
                    <Text>{`£${quote.excess}`}</Text>
                    <Text>{`EXCESS`}</Text>
                </View>
                <Image style={styles.arrow_right} source={ARROW_BOLD} />
            </View>
            <View style={styles.quote_bottom}>
                <Text>{quote.name.toUpperCase()}</Text>
                <Text>{quote.extras + ` EXTRAS`}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ListOfQuotes = ({quotes}) => {
    return (
        <View style={styles.annual_list_of_quotes}>
            {quotes.map((quote, i) => renderQuote(quote, i))}
        </View>
    )
}

export default ListOfQuotes;