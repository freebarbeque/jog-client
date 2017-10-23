import * as React from 'react';
import {  Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { LANDING_TITLE_BG, RIGHT_ARROW, LANDING_FEATURES_IMG } from '../../../cfg/globStyles';
import { LANDING_FEATURES } from '../../../cfg/constants';

import styles from '../HomeStyles';


const Landing = () => {
    return(
        <View style={styles.land_container}>
            <View style={styles.title_container}>
                <Image source={LANDING_TITLE_BG} style={styles.title_bg_img}/>
                <Text style={styles.land_title}>{`Your Insurance \n Memory`}</Text>
                <View style={styles.land_title_divider} />
                <Text style={styles.land_description}>{`Store your policies \n minimise your premiums`}</Text>
            </View>
            <TouchableOpacity style={styles.land_add_policy_container}>
                <Text style={styles.land_add_policy_text}>{`Add your motor policy \n to get started`}</Text>
                <Image style={styles.land_add_right_arrow} source={RIGHT_ARROW} />
            </TouchableOpacity>
            <View style={styles.feature_list}>
                {renderFeatures()}
            </View>
        </View>
    )
}


const renderFeatures = () => LANDING_FEATURES.map((feature:any, i:number) => {
    return (
        <View style={styles.feature_item} key={i}>
            <Image style={LANDING_FEATURES_IMG[i].style} source={LANDING_FEATURES_IMG[i].source} />
            <Text style={styles.feature_subtitle}>{feature.subtitle}</Text>
            <Text style={styles.feature_title}>{feature.title}</Text>
            <Text style={styles.feature_description}>{feature.description}</Text>
        </View>
    )
})

export default Landing