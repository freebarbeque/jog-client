import * as React from 'react';
import {  Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import styles from '../SettingsStyles';
import Header from '../../Header/HeaderContainer';
import { DROP_ARROW, ANS_ICON } from '../../../cfg/globStyles';
import SETTINGS_SECTIONS from '../__mocks';

const renderHeader = (header, i) => (
    <View style={[styles.item_header, i === 1 && styles.top_border, i === 0 && styles.border_none]}>
        <Text style={styles.item_header_text}>{header.title}</Text>
        <Image style={styles.drop_arrow} source={DROP_ARROW} />
    </View>
)


const renderContent = (inner) => (
    <View style={styles.drop_item_content_view}> 
        {inner.renderer ? inner.renderer() : <Text>{inner.content}</Text>}
    </View>
)

export const HelpElement = () => (
<TouchableOpacity style={styles.help_rect}>
    <View style={styles.help_rect_left} />
    <View style={styles.help_rect_center} />
    <View style={styles.help_rect_right} />
    <Image style={styles.help_rect_img} source={ANS_ICON} />
    <Text style={styles.help_rect_text}>Help</Text>
</TouchableOpacity>
)

const Settings = (props) => {

    const {navigation} = props;
    return (
        <View style={styles.settings_container}>
                <Header navigation={navigation} />
                <ScrollView contentContainerStyle={styles.list_cover}>
                    <Accordion
                        sections={SETTINGS_SECTIONS}
                        renderHeader={renderHeader}
                        renderContent={renderContent}/>
                    <View style={styles.help_container}>
                        {HelpElement()}
                    </View>
                </ScrollView>
        </View>
    )
};

export default Settings;