import * as React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import styles, {WARR_ITEM_COVER}  from '../WarrantiesStyles';
import {HelpElement} from '../../Settings/components/Settings';
import warranties from '../__mocks';

const renderItem = (item, i) => {
    return (
        <TouchableOpacity key={i} style={[styles.item_container, i === 0 && styles.first_container]}>
            <View style={styles.item_cover}>
                <View style={styles.item_img_cover}>
                    <Image style={styles.item_img} source={WARR_ITEM_COVER}/>
                </View>
                <View style={styles.item_info_container}>
                    <Text style={styles.warr_type_text}>{item.type}</Text>
                    <Text style={styles.product_text}>{item.product}</Text>
                </View>
                <View style={styles.logo_round}>
                    <Image style={[styles.item_logo_img, item.logo.style]} source={item.logo.source}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const WarrantiesList = () => {
    return (
        <ScrollView style={styles.list}>
            {warranties.map((item, i) => renderItem(item, i))}
            <View style={styles.help_container}>
                {HelpElement()}
            </View>
        </ScrollView>
    )
}

export default WarrantiesList;