import { StyleSheet } from 'react-native';
import { WHITE, GREY, LIGHT_GREY } from '../../cfg/globStyles';

export const AUTO_IMG = require('../../../img/auto_img.png');
export const TRAVEL_IMG = require('../../../img/travel_img.png');
export const HOME_IMG = require('../../../img/home_img.png');
export const WARRANTIES_IMG = require('../../../img/warranties_img.png');
export const ARROW_BOLD = require('../../../img/arrow_bold.png');

const styles = StyleSheet.create({
    policies_container: {
        backgroundColor: WHITE,
        height: '100%'
    },
    sub_header: {
        backgroundColor: GREY,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 30
    },
    sub_header_text: {
        color: WHITE,
        fontSize: 15,
        fontWeight: '500'
    },
    item_container: {
        borderBottomWidth: 1,
        borderBottomColor: LIGHT_GREY,
        height: 115
    },
    item_title: {
        position: 'absolute',
        fontSize: 20,
        left: 30,
        top: 20,
        fontWeight: '500'
    },
    item_sub_title: {
        color: GREY,
        position: 'absolute',
        fontSize: 12,
        left: 30,
        top: 42,
        fontWeight: '200'
    },
    item_arrow: {
        position: 'absolute',
        right: 20,
        top: 50,
        height: 11,
        width: 8
    }
});

export default styles;
