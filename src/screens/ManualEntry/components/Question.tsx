import * as React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Picker, TextInput, KeyboardAvoidingView } from 'react-native';
import styles, {DROW_ARROW} from '../ManualEntryStyles';
import ModalDropdown from 'react-native-modal-dropdown';
import {renderOption} from './renderOption';

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
            <KeyboardAvoidingView style={styles.inputs_container} behavior={'position'} keyboardVerticalOffset={-70}>
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
            </KeyboardAvoidingView>
        </View>
    )
}

export default Question;