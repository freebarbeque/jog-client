import * as React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Picker } from 'react-native';
import styles from '../ManualEntryStyles';
import Header from './ManualEntryHeader';
import Question from './Question';

interface Props {
    navigation: any;
    onNextQuestion: Function;
    onPrevQuestion: Function;
    currentQuestionNumber: number;
    questions: [{
        question: string;
        answer: string;
        ID: string;
    }]
}

const ManualEntry: React.StatelessComponent<Props> = (props) => {
    const { navigation, onNextQuestion, onPrevQuestion, questions, currentQuestionNumber } = props;
    return (
        <View style={styles.manual_entry_container}>
            <Header navigation={navigation}/>
            {
                questions.map((currentQuestion, i) => i === currentQuestionNumber ? (
                    <Question
                        key={i}
                        qNumber={i}
                        navigation={navigation}
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

export default ManualEntry;
