import * as React from 'react';
import {  Text, View, TouchableOpacity, Image } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import styles, {BACK_ARROW, LOGO_IMG} from '../CarQuestionsStyles';

interface Props {
    navigation: any
}

const CarQuestionsHeader:React.StatelessComponent<Props> = ({navigation}) => {
    return (
        <View style={styles.header_container}>
            <View style={styles.logo_container}>
                <TouchableOpacity style={styles.back_touchable} onPress={() => navigation.goBack()}>
                    <Image style={styles.back_arrow_icon} source={BACK_ARROW} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logo_touchable} onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.logo_img} source={LOGO_IMG} />
                </TouchableOpacity>
            </View>
        </View>
        
    )
};

export default CarQuestionsHeader;
