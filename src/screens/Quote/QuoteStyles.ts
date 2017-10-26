import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME, LIGHT_GREY, GREY_SETTINGS_BG, GREY } from '../../cfg/globStyles';

const styles = StyleSheet.create({
    quote_container: {
        backgroundColor: CREME,
        flex: 0
    },
    quote_title: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: WHITE,
        borderBottomColor: GREY_SETTINGS_BG,
        borderBottomWidth: 1
    },
    sub_section: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 9,
        paddingBottom: 9,
    },
    title_section: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40
    },
    arrow_right: {
        position: 'absolute',
        height: 11,
        width: 8,
        right: 30,
        top: 20
    },
    section_title: {
        fontSize: 17,
        marginLeft: 30,
        fontWeight: '500'

    },
    percent: {
        width: 60,
        height: 60,
        marginRight: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questions: {
        backgroundColor: '#E2E2E2',
        paddingLeft: 100,
        paddingBottom: 5,
        paddingTop: 5,
        fontSize: 14,
    },
    car_img: {
        width: 30,
        height: 40
    },
    driver_img: {
        width: 27,
        height: 37
    },
    usage_img: {
        width: 40,
        height: 30
    },
    not_complete: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 0,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    no_complete_text: {
        backgroundColor: 'transparent'
    },
    complete: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 0,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    complete_icon: {
        zIndex: 10,
        width: 20,
        height: 15
    }
});

export const ARROW = require('../../../img/arrow_bold.png');
export const COMPLETE_ICON = require('../../../img/done_icon.png');
export const QUOTE_SECTIONS_IMG = [
    {source: require('../../../img/questions_car.png'), style: styles.car_img},
    {source:  require('../../../img/questions_driver.png'), style: styles.driver_img},
    {source:  require('../../../img/questions_usage.png'), style: styles.usage_img}
]

export default styles;