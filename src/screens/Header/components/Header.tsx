import * as React from 'react';
import {  Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../HeaderStyles';
import { LOGO } from '../../../cfg/globStyles';

const policiesHighlighter = (route) => ['Policies', 'Warranties', 'Motor', 'MotorNewPolicy'].indexOf(route) >= 0 ? styles.red_btn : null

const Header = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logo_container}>
                <TouchableOpacity style={styles.logo_touchable} onPress={() => navigation.navigate('Home')}>
                    <Image source={LOGO} style={styles.logo_img}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signout_touchable}>
                    <Text style={styles.singout_text}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.links_container}>
                <TouchableOpacity style={styles.policies_btn_touchable} onPress={() => navigation.navigate('Policies')}>
                    <Text style={[styles.policies_btn_text, policiesHighlighter(navigation.state.routeName)]}>Policies</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Text style={[styles.settings_btn_text, navigation.state.routeName === 'Settings' && styles.red_btn]}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header;
