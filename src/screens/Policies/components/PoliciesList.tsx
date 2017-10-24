import * as React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import styles, {AUTO_IMG, TRAVEL_IMG, HOME_IMG, WARRANTIES_IMG, ARROW_BOLD} from '../PoliciesStyles';


const policiesList:[any] = [{
    title: 'Motor',
    img: {
        source: AUTO_IMG,
        styles: {width: 175, height: 93, position: 'absolute', right: 50, bottom: 5}
    },
    route: 'Motor'
},{
    title: 'Travel',
    img: {
        source: TRAVEL_IMG,
        styles: {width: 164, height: 91, position: 'absolute', right: 50, bottom: 5}
    },
    route: null
},{
    title: 'Home & Contents',
    img: {
        source: HOME_IMG,
        styles: {width: 170, height: 80, position: 'absolute', right: 50, bottom: 5}
    },
    route: null
},{
    title: 'Warranties',
    img: {
        source: WARRANTIES_IMG,
        styles: {width: 134, height: 79, position: 'absolute', right: 50, bottom: 5}
    },
    route: 'Warranties'
}]

const renderPoliciesList = (navigation) => policiesList.map((item, i) => (
    <TouchableOpacity key={i} style={styles.item_container} onPress={() => navigation.navigate(item.route)}>
        <Text style={styles.item_title}>{item.title}</Text>
        <Image style={item.img.styles} source={item.img.source} />
        <Image style={styles.item_arrow} source={ARROW_BOLD} />
    </TouchableOpacity>
));

export default renderPoliciesList;