import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';

interface Props {
    navigation: any
}

const Quote: React.StatelessComponent<Props> = ({navigation}) => {
    console.log('Quote RENDER!!!');
    
    return (
        <Text>Quote</Text>
    )
}

export default Quote;
