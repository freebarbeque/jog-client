import * as React from 'react';
import {
    Text, View, ScrollView, Image, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, RegisteredStyle,
    ImageStyle
} from 'react-native';
import styles, {CAR} from '../CarQuestionsStyles';
import Header from './CarQuestionsHeader';

interface IProps {
    navigation: any,
    questions: [{
        question: string;
        answer: string;
    }],
    onNextQuestion: Function;
    onPrevQuestion: Function;
    currentQuestionNumber: number;
    answerOnChange: Function;
    carCompletedPercent: number;
}

const renderPrevBtn = (btnNumber, onPrev) => (
  !btnNumber ? null : <TouchableOpacity style={[styles.button]} onPress={onPrev}><Text style={styles.btn_text_left}>Prev</Text></TouchableOpacity>
);
const renderNextBtn = (btnNumber, questionsListLength, currentQuestion, onNext, carCompletedPercent) => {
    const requiresResponse = currentQuestion.answer === ''

    let buttonStyles: ImageStyle[] = [];
    if (requiresResponse) {
      buttonStyles = [styles.button, styles.button_grey]
    } else {
      buttonStyles = [styles.button, styles.red_button]
    }

    if (btnNumber + 1 === questionsListLength) {
        return <TouchableOpacity style={buttonStyles} onPress={() => onNext(carCompletedPercent)}><Text style={styles.btn_text_right}>Finish</Text></TouchableOpacity>
    } else {
        return <TouchableOpacity disabled={requiresResponse} style={buttonStyles} onPress={() => onNext(carCompletedPercent)}><Text style={styles.btn_text_right}>Next</Text></TouchableOpacity>
    }
}

const Question = (props) => {
    const {data, onPrev, onNext, qNumber, answerOnChange, questions, carCompletedPercent} = props;
    return (
        <View style={styles.question_container}>
            <View style={styles.title_container}>
                <Image style={styles.title_img} source={CAR}/>
                <View style={styles.title}>
                    <Text style={styles.title_placeholder}>QUESTION</Text>
                    <Text style={styles.question}>{data.question}</Text>
                    <Text style={styles.left_answers_amount}>
                      6 questions left to answer
                    </Text>
                </View>
            </View>
            <View style={styles.progress_container}>
                <View style={[styles.progress, {width: ((qNumber + 1) / questions.length) * 100 + '%'}]} />
            </View>
            <KeyboardAvoidingView keyboardVerticalOffset={-70} behavior={'position'} style={styles.inputs_container}>
                <View style={styles.text_input_container}>
                    <View>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={'none'}
                            style={styles.text_input}
                            value={data.answer}
                            onChangeText={(answer) => answerOnChange(answer, qNumber)}
                        />
                    </View>
                </View>
                <View style={styles.buttons_container}>
                    <View>{renderPrevBtn(qNumber, onPrev)}</View>
                    <View>{renderNextBtn(qNumber, questions.length, questions[qNumber], onNext, carCompletedPercent)}</View>
                </View>
                <Text style={styles.answered}>{`ANSWERED ${qNumber + 1} / ${questions.length}`}</Text>
            </KeyboardAvoidingView>
        </View>
    )
}

const CarQuestions: React.StatelessComponent<IProps> = (props) => {
    const {navigation, questions, currentQuestionNumber, answerOnChange, onNextQuestion, onPrevQuestion, carCompletedPercent} = props;
    return (
        <View style={styles.car_questions_container}>
            <Header navigation={navigation}/>
            {
                questions.map((currentQuestion, i) => i === currentQuestionNumber ? (
                    <Question
                        key={i}
                        qNumber={i}
                        carCompletedPercent={carCompletedPercent}
                        answerOnChange={answerOnChange}
                        onPrev={onPrevQuestion}
                        onNext={onNextQuestion}
                        questions={questions}
                        data={currentQuestion}
                    />
                ) : null)
            }
        </View>
    )
}

export default CarQuestions;
