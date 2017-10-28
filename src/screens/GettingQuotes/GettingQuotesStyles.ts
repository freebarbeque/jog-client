import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME, LIGHT_GREY, GREY_SETTINGS_BG, PURPLE, GREY } from '../../cfg/globStyles';

export const BACK_ARROW = require('../../../img/right_arrow.png');
export const AUTO_IMG = require('../../../img/questions_car.png');
export const RED_SPINNER = require('../../../img/getting_quotes_spinner.png');

const styles = StyleSheet.create({
    getting_quotes_container: {
        flex: 1,
        // backgroundColor: PURPLE
    },
    getting_quotes_header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        paddingTop: 25,
        paddingBottom: 10
    },
    back_touch: {
        position: 'absolute',
        left: 20,
        top: 20,
        // backgroundColor: 'green',
        // width: 20,
        // height: 35,
    },
    back_img: {
        transform: [{rotate: '180deg'}],
        width: 20,
        height: 35,
        
        
    },
    header_title: {
        color: WHITE,
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent'

    },
    wait_container: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 100,
        marginTop: 40
    },
    placeholder: {
        color: WHITE,
        fontSize: 12,
        backgroundColor: 'transparent'

    },
    car_model: {
        color: WHITE,
        fontSize: 26,
        backgroundColor: 'transparent'
    },
    car_img: {
        position: 'absolute',
        top: 25,
        left: 30,
        width: 41,
        height: 50
    },
    spinner_img: {
        width: 65,
        height: 65,
        marginTop: 40,
        marginBottom: 40,
        marginLeft: 30
        
    },
    wait_text: {
        color: WHITE,
        fontSize: 26,
        backgroundColor: 'transparent'
    }
});

export default styles;