import * as React from 'react';
import {  View, ScrollView } from 'react-native';
import Header from '../../Header/HeaderContainer';
import Landing from './Landing'
import styles from '../HomeStyles';

interface Props {
    navigation: any
}
interface State {}

export default class HomeScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}/>
                <ScrollView>
                    <Landing />
                </ScrollView>
                
            </View>
        );
    }
}
