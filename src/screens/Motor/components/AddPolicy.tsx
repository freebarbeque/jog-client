import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles, {ADD_ICON} from '../MotorStyles';

const AddPolicy = ({navigation}) => {
    return (
        <TouchableOpacity style={styles.item_container} onPress={() => navigation.navigate('MotorNewPolicy')}>
        <View style={styles.item_cover}>
            <View style={styles.item_img_cover}>
            </View>
            <View style={styles.item_info_container}>
                <Text style={styles.warr_type_text}>{`Add a policy`}</Text>
                <Text style={styles.product_text}>{`Answer 4 short questions\nto add a new policy`}</Text>
            </View>
            <View style={styles.logo_round}>
                <Image style={styles.round_add_icon} source={ADD_ICON} />
            </View>
        </View>
    </TouchableOpacity>
    )
}

export default AddPolicy;
