import * as React from 'react';
import {  View, ScrollView, Text } from 'react-native';

interface Props {
    navigation: any
}
interface State {}


export default class MonthlyQuotes extends React.Component<Props, State> {
    constructor(props) {
        super(props); 

    }

    render() {

        return (
            <View>
                <Text>MonthlyQuotes</Text>
            </View>
        );
    }
}
