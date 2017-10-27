import { StyleSheet } from 'react-native';
import { WHITE, PINK, CREME, LIGHT_GREY, GREY_SETTINGS_BG, PURPLE, GREY } from '../../cfg/globStyles';

export const BACK_ARROW = require('../../../img/right_arrow.png');
export const LOGO_IMG = require('../../../img/logo.png');
export const DROW_ARROW = require('../../../img/drop_arrow.png');
export const CLOSE_ICON = require('../../../img/close_icon.png');

const styles = StyleSheet.create({
    manual_entry_container: {
        backgroundColor: WHITE,
        flex: 1
    },
    header_container: {
        backgroundColor: PURPLE,
        paddingTop: 30,
        paddingLeft: 20,
        paddingBottom: 10
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 30
    },
    close_icon: {
        width: 20,
        height: 20
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
    title_container: {
        backgroundColor: PURPLE,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 25,
        paddingRight: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 15,
        height: 145
        
    },
    title: {
        flexWrap: 'wrap',
        flex: 1,
        paddingLeft: 65
        
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
    buttons_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30
    },
    finish_button_container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    button: {
        display: 'flex',
        borderWidth: 1,
        borderColor: '#CCC',
        paddingBottom: 12,
        paddingTop: 12,
        width: 140,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center'

    },
    red_button: {
        backgroundColor: PINK,
        borderWidth: 1,
        borderColor: PINK

    },
    btn_text_left: {
        color: '#CCC',
        fontSize: 16,
        textAlign: 'center'
    },
    btn_text_right: {
        color: WHITE,
        fontSize: 16,
        textAlign: 'center'
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
    },
    inputs_container: {
        display: 'flex',
        flexDirection: 'column'
    },
    input_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
    },
    menu: {
        width: 300,
        height: 60,
        borderRadius: 3,
        backgroundColor: '#F4F0E6',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',  
    },
    menu_drop: {
        backgroundColor: '#F4F0E6',
        width: 300,
    },
    menu_text: {
        fontSize: 18,
        width: 300,
        height: '100%',
        paddingLeft: 20,
        paddingTop: 17,
        zIndex: 10
    },
    menu_drop_text: {
        fontSize: 16,
        height: 55,
        paddingTop: 17,
    },
    drop_arrow: {
        position: 'absolute',
        right: 15,
        top: 15,
        width: 25,
        height: 25,
        transform: [{rotate: '180deg'}],
        zIndex: 9
    },
    text_input: {
        backgroundColor: '#F4F0E6',
        width: 160,
        height: 60,
        paddingLeft: 10,
        fontSize: 22
    },
    multiple_dropdowns_container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F4F0E6'
    },
    menu_multiple: {
        width: 90,
    },
    menu_text_multiple: {
        width: 90
    },
    menu_drop_multiple: {
        width: 90
    },
    divider: {
        alignSelf: 'stretch',
        backgroundColor: WHITE,
        width: 1,
        marginTop: 10,
        marginBottom: 5
    },
    year_cost_inputs_container: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: '#F4F0E6'
    },
    cost_menu_drop: {
        width: 45
    },
    cost_menu_text: {
        width: 45
    },
    cost_menu: {
        width: 45
    },
    cost_text_input: {
        width: 100
    },
    plate_no_inputs_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    plate_no_radio: {
        display: 'flex',
        flexDirection: 'row'
    },
    no_radio: {
        width: 60,
        height: 30,
        backgroundColor: PINK,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    yes_radio: {
        width: 60,
        height: 30,
        backgroundColor: '#F4F0E6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    radio_text_no: {
        color: WHITE,
        fontSize: 18,
        fontWeight: '500'
    },
    radio_text_yes: {
        fontSize: 18,
        fontWeight: '500'
    },
    multi_car_policy_text: {
        fontSize: 20,
        marginTop: 15,
        marginBottom: 10
    },
    vehicle_container: {
        display: 'flex',
        flexDirection: 'column'
    },
    vehicle_option: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 5
    },
    vehicle_round: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F0E6',
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 15
    },
    vehicle_label: {
        fontSize: 26
    },
    picked_option: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: PINK,
    }

});

export default styles;