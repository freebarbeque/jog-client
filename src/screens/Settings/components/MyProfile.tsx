import * as React from 'react';
import {  Text, View, TouchableOpacity, Image } from 'react-native';
import { MOCK_PROFILE_IMG } from '../../../cfg/globStyles';
import styles from '../SettingsStyles';
import { DROP_ARROW } from '../../../cfg/globStyles';

const MyProfile = () => (
    <View style={styles.my_profile_container}>
        <View style={styles.avatar_img_cover}>
            <Image style={styles.avatar_img} source={MOCK_PROFILE_IMG} />
        </View>
        <View style={styles.info_container}>
            <Text style={styles.info_subtitle}>FIRST NAME</Text>
            <Text style={styles.info}>John</Text>
        </View>
        <View style={styles.info_container}>
            <Text style={styles.info_subtitle}>SURNAME</Text>
            <Text style={styles.info}>Doe</Text>
        </View>
        <View style={styles.info_container}>
            <Text style={styles.info_subtitle}>DATE OF BIRTH</Text>
            <Text style={styles.info}>01.01.1980</Text>
        </View>
        <View style={styles.info_container}>
            <Text style={styles.info_subtitle}>ADDRESS</Text>
            <Text style={styles.info}>XXX</Text>
        </View>
        <View style={styles.info_container}>
            <Text style={styles.info_subtitle}>POSTCODE</Text>
            <Text style={styles.info}>XXXX</Text>
        </View>
        <TouchableOpacity style={styles.change_email_view}>
            <Text style={styles.change_email_subtitle}>TO MAKE PROFILE CHANGES EMAIL:</Text>
            <Text style={styles.info_email}>support@jog.com</Text>
            <Image style={styles.arrow_right} source={DROP_ARROW}/>
        </TouchableOpacity>
    </View>
)


export default MyProfile;