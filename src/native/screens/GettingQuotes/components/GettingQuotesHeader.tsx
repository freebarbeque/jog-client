import * as React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import styles, {BACK_ARROW} from '../GettingQuotesStyles';
import Header from './GettingQuotesHeader';

interface IProps {
    navigation: any;
    title: string;
}

const GettingQuotesHeader: React.StatelessComponent<IProps> = (props) => {
    const {navigation, title} = props;
    return (
        <View style={styles.getting_quotes_header}>
            <TouchableOpacity style={styles.back_touch} onPress={() => navigation.navigate('PolicyInfo')}>
                <Image style={styles.back_img} source={BACK_ARROW}/>
            </TouchableOpacity>
            <Text style={styles.header_title}>{title}</Text>
        </View>
    )
}

export default GettingQuotesHeader;
