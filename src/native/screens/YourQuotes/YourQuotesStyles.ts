import { StyleSheet } from 'react-native';
import { WHITE, GREY, CREME, GREY_SETTINGS_BG, PURPLE, PINK } from '../../cfg/globStyles';

export const QUOTE_IMG = require('../../../../img/quotes_img.png');

const styles = StyleSheet.create({
    your_quotes_container: {
        backgroundColor: PURPLE,
        flex: 1
    },
    tab_bar: {
        backgroundColor: PURPLE
    },
    tab_label: {
        color: WHITE,
        fontWeight: '500',
        fontSize: 16
    },
    tab_active_indicator: {
        height: 5,
        backgroundColor: PINK
    },
    sub_header_container: {
        backgroundColor: PURPLE,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    title_img: {
        width: 45,
        height: 38,
        marginRight: 22,
        marginTop: 15
    },
    title: {
        flexWrap: 'wrap',
        flex: 1,
    },
    title_placeholder: {
        color: '#CCC',
        fontSize: 12
    },
    car_model: {
        color: WHITE,
        fontSize: 24,
        marginTop: 5,
        lineHeight: 30
    },
    monthly_subheader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    monthly_img: {
        width: 27,
        height: 23,
        marginRight: 15

    },
    car_monthly_model: {
        color: WHITE,
        fontSize: 16
    },
    select_btn: {
        backgroundColor: PINK,
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    select_text: {
        color: WHITE,
        fontSize: 20
    }
});

export default styles;