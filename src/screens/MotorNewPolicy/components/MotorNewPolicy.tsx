import * as React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import styles, {TYPE_IMG, EMAIL_IMG, PHOTO_IMG, TITLE_BG} from '../MotorNewPolicyStyles';
import Header from '../../Header/HeaderContainer';

const MotorNewPolicy = ({navigation}) => {
    return (
        <View style={styles.motor_policies_container}>
            <Header navigation={navigation} />
            <View style={styles.title_container} >
                <Text style={styles.title}>Motor Policies</Text>
                <Text style={styles.sub_title}>Lets get started</Text>
                <Image style={styles.title_img} source={TITLE_BG} />
            </View>
            <View style={styles.options_container}>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.recomended}>RECOMMENDED</Text>
                    <Text style={styles.opt_title}>Email the policy</Text>
                    <Image style={[styles.opt_img, styles.email_img]} source={EMAIL_IMG}/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, styles.border_option]}>
                    <Text style={styles.opt_title}>Photograph your policy</Text>
                    <Image style={[styles.opt_img, styles.photo_img]} source={PHOTO_IMG}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.opt_title}>Manual entry</Text>
                    <Image style={[styles.opt_img, styles.type_img]} source={TYPE_IMG} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default MotorNewPolicy;