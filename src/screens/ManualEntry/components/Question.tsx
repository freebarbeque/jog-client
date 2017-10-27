import * as React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Picker, TextInput } from 'react-native';
import styles, {DROW_ARROW} from '../ManualEntryStyles';
import ModalDropdown from 'react-native-modal-dropdown';

const renderOption = (ID) => {
    switch (ID) {
        case 'insurer': 
            return insurerInput();
        case 'pol_number':
            return polNumberInput();
        case 'expire_date':
            return expireNumberInput();
        case 'year_cost':
            return yearCostInput();
        case 'plate_no':
            return plateNoInputs();
        case 'your_vehicle':
            return vehicleInputs();
    }
} 

const vehicleInputs = () => (
    <View style={styles.vehicle_container}>
        <View style={styles.vehicle_option}>
            <View style={styles.vehicle_round}><View style={styles.picked_option} /></View>
            <Text style={styles.vehicle_label}>Owned</Text>
        </View>
        <View style={styles.vehicle_option}>
            <View style={styles.vehicle_round} />
            <Text style={styles.vehicle_label}>Leased</Text>
        </View>
        <View style={styles.vehicle_option}>
            <View style={styles.vehicle_round} />
            <Text style={styles.vehicle_label}>Financed</Text>
        </View>
    </View>
)

const plateNoInputs = () => {
    return (
        <View style={styles.plate_no_inputs_container}>
            <View><TextInput style={styles.text_input}/></View>
            <Text style={styles.multi_car_policy_text}>Is this a Multi Car Policy?</Text>
            <View style={styles.plate_no_radio}>
                <TouchableOpacity style={styles.no_radio}><Text style={styles.radio_text_no}>No</Text></TouchableOpacity>
                <TouchableOpacity style={styles.yes_radio}><Text style={styles.radio_text_yes}>Yes</Text></TouchableOpacity>
            </View>
        </View>
    )
} 
    


const yearCostInput = () => (
    <View style={styles.year_cost_inputs_container}>
        <ModalDropdown 
            defaultValue={'£'}
            dropdownStyle={[styles.menu_drop, styles.cost_menu_drop]} 
            textStyle={[styles.menu_text, styles.cost_menu_text]}
            dropdownTextStyle={[styles.menu_drop_text]}
            style={[styles.menu, styles.cost_menu]} 
            options={['€', '$', '£']}/>
        <View style={styles.divider}/>
        <TextInput defaultValue={'0'} style={[styles.text_input, styles.cost_text_input]}/>
    </View>
)

const expireNumberInput = () => (
    <View style={styles.multiple_dropdowns_container}>
        <ModalDropdown 
            defaultValue={'01'}
            dropdownStyle={[styles.menu_drop, styles.menu_drop_multiple]} 
            textStyle={[styles.menu_text, styles.menu_text_multiple]}
            dropdownTextStyle={[styles.menu_drop_text]}
            style={[styles.menu, styles.menu_multiple]} 
            options={['01', '02', '03', '04']}/>
        <View style={styles.divider}/>
        <ModalDropdown 
            defaultValue={'01'}
            dropdownStyle={[styles.menu_drop, styles.menu_drop_multiple]} 
            textStyle={[styles.menu_text, styles.menu_text_multiple]}
            dropdownTextStyle={styles.menu_drop_text}
            style={[styles.menu, styles.menu_multiple]} 
            options={['01', '02', '03', '04']}/>
        <View style={styles.divider}/>
        <ModalDropdown 
            defaultValue={'2017'}
            dropdownStyle={[styles.menu_drop, styles.menu_drop_multiple]} 
            textStyle={[styles.menu_text, styles.menu_text_multiple]}
            dropdownTextStyle={styles.menu_drop_text}
            style={[styles.menu, styles.menu_multiple]} 
            options={['2016', '2017', '2018']}/>
    </View>
)

const polNumberInput = () => (
    <View>
        <TextInput style={styles.text_input}/>
    </View>
)

const insurerInput = () => (
    <View>
        <ModalDropdown 
            defaultValue={'Other'}
            dropdownStyle={styles.menu_drop} 
            textStyle={styles.menu_text}
            dropdownTextStyle={styles.menu_drop_text}
            style={styles.menu} 
            options={['option 1', 'option 2']}/>
        <Image style={styles.drop_arrow} source={DROW_ARROW} />
    </View>
)

const renderPrevBtn = (number, onPrev) => (
    !number ? null : 
        <TouchableOpacity style={[styles.button]} onPress={onPrev}>
            <Text style={styles.btn_text_left}>Prev</Text>
        </TouchableOpacity>
);

const renderNextBtn = (number, questionsListLength, onNext) => (
    number + 1 === questionsListLength ? null : 
        <TouchableOpacity style={[styles.button, styles.red_button]} onPress={onNext}>
            <Text style={styles.btn_text_right}>Next</Text>
        </TouchableOpacity>
);

const renderFinishBtn = (navigation) => (
    <TouchableOpacity style={[styles.button, styles.red_button]} onPress={() => navigation.navigate('Policies')}>
        <Text style={styles.btn_text_right}>Finish</Text>
    </TouchableOpacity>
)

const Question = (props) => {
    const {data, onPrev, onNext, qNumber, answerOnChange, questions, navigation} = props;
    return (
        <View style={styles.question_container}>
            <View style={styles.title_container}>
                <View style={styles.title}>
                    <Text style={styles.title_placeholder}>POLICY ENTRY</Text>
                    <Text style={styles.question}>{data.question}</Text>
                </View>
            </View>
            <View style={styles.progress_container}>
                <View style={[styles.progress, {width: ((qNumber + 1) / questions.length)*100 + '%'}]} />
            </View>
            <View style={styles.inputs_container}>
                <View style={styles.input_container}>{renderOption(data.ID)}</View>
                {
                    qNumber + 1 === questions.length
                    ?
                    <View style={styles.finish_button_container}>
                        <View>{ renderFinishBtn(navigation) }</View>
                    </View>
                    :
                    <View style={styles.buttons_container}>
                        <View>{ renderPrevBtn(qNumber, onPrev) }</View>
                        <View>{ renderNextBtn(qNumber, questions.length, onNext) }</View>
                    </View>
                }
                <Text style={styles.answered}>{`ANSWERED ${qNumber + 1} / ${questions.length}`}</Text>
            </View>
        </View>
    )
}

export default Question;