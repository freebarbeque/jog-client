import * as React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import styles, { MOTOR_COVER_IMG, ADD_ICON }  from '../MotorStyles';
import { HelpElement } from '../../Settings/components/Settings';
import motors from '../__mocks';
import AddPolicy from './AddPolicy';

const renderItem = (item, i, navigation) => {
    return (
        <TouchableOpacity key={i} onPress={() => navigation.navigate(item.route !== "" && item.route)} style={[styles.item_container, i === 0 && styles.first_container]}>
            <View style={styles.item_cover}>
                <View style={styles.item_img_cover}>
                    <Image style={styles.item_img} source={MOTOR_COVER_IMG}/>
                </View>
                <View style={styles.item_info_container}>
                    <Text style={styles.warr_type_text}>{item.name}</Text>
                    <Text style={styles.product_text}>{`Add more details to \n complete this policy`}</Text>
                </View>
                <View style={styles.logo_round}>
                    <Image style={[styles.item_logo_img, item.logo.style]} source={item.logo.source} />
                </View>
                <Image style={styles.add_icon} source={ADD_ICON} />
            </View>
        </TouchableOpacity>
    )
}

const MotorPoliciesList = ({navigation}) => {
    return (
        <ScrollView style={styles.list}>
            {motors.map((item, i) => renderItem(item, i, navigation))}
            <AddPolicy navigation={navigation}/>
            <View style={styles.help_container}>
                { HelpElement() }
            </View>
        </ScrollView>
    )
}

export default MotorPoliciesList;