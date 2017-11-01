import * as React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Picker, TextInput, KeyboardAvoidingView } from 'react-native';
import styles, {DROW_ARROW} from '../ManualEntryStyles';
import ModalDropdown from 'react-native-modal-dropdown';

export const renderOption = (ID) => {
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
            <View><TextInput underlineColorAndroid={'transparent'} style={styles.text_input}/></View>
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
        <TextInput 
            underlineColorAndroid={'transparent'} 
            defaultValue={'0'} style={[styles.text_input, styles.cost_text_input]}/>
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
        <TextInput underlineColorAndroid={'transparent'} style={styles.text_input}/>
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