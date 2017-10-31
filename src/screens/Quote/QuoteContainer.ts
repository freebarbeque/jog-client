import { connect } from "react-redux";
import Quote from "./components/Quote";
import { compose } from 'recompose';


export const getCarCompletedPercent = (quostions) => {
    const questionsLength = quostions.length;
    const answered = quostions.filter((item) => item.answer !== '').length;

    return answered === 0 ? 0 : Math.round(answered / questionsLength * 100);

}

const mapStateToProps = (state) => {
    return {
        carQuestions: state.carQuestions.questions,
        quoteSections: state.quote.quoteSections,
        carCompletedPercent: getCarCompletedPercent(state.carQuestions.questions)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Quote);