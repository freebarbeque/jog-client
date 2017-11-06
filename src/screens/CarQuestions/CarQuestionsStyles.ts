import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME, LIGHT_GREY, GREY_SETTINGS_BG, PURPLE, GREY } from '../../cfg/globStyles';

export const CAR = require('../../../img/questions_car.png');
export const BACK_ARROW = require('../../../img/right_arrow.png');
export const LOGO_IMG = require('../../../img/logo.png');

const styles = StyleSheet.create({
    car_questions_container: {
        backgroundColor: WHITE,
        flex: 1
    },
    header_container: {
        backgroundColor: PURPLE,
        paddingTop: 30,
        paddingLeft: 20,
        paddingBottom: 10
    },
    logo_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    back_touchable: {

    },
    back_arrow_icon: {
        transform: [{rotate: '180deg'}],
        width: 20,
        height: 35
    },
    logo_touchable: {
        marginLeft: 50
    },
    logo_img: {
        width: 60,
        height: 30,
        marginTop: 5
    },
    question_container: {
        backgroundColor: WHITE,
    },
    input: {
        height: 30,
        width: 50,
        backgroundColor: 'yellow'
    },
    title_container: {
        backgroundColor: PURPLE,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 25,
        paddingRight: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 15
    },
    title_img: {
        width: 40,
        height: 52,
        marginRight: 22

    },
    title: {
        flexWrap: 'wrap',
        flex: 1,
    },
    title_placeholder: {
        color: PINK,
        fontSize: 12
    },
    question: {
        color: WHITE,
        fontSize: 24,
        marginTop: 5,
        marginBottom: 8
    },
    left_answers_amount: {
        color: '#999',
        fontSize: 14,
        marginBottom: 25
    },
    text_input: {
        backgroundColor: '#F4F0E6',
        width: 160,
        height: 60,
        paddingLeft: 10,
        fontSize: 22
    },
    inputs_container: {
        display: 'flex',
        flexDirection: 'column'
    },
    text_input_container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: 260,
    },
    buttons_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30
    },
    button: {
        display: 'flex',
        borderWidth: 1,
        borderColor: '#CCC',
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 58,
        paddingRight: 58,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    button_grey: {
        backgroundColor: '#CCC'
    },
    red_button: {
        backgroundColor: PINK
    },
    btn_text_left: {
        color: '#CCC',
        fontSize: 16
    },
    btn_text_right: {
        color: WHITE,
        fontSize: 16
    },
    answered: {
        textAlign: 'center',
        width: '100%',
        fontSize: 12,
        fontWeight: '500',
        paddingTop: 60
    },
    progress_container: {
        width: '100%',
        backgroundColor: PURPLE
    },
    progress: {
        height: 4,
        backgroundColor: PINK
    }
});

export default styles;
