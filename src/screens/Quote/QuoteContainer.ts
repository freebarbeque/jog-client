import { connect } from "react-redux";
import Quote from "./components/Quote";
import { compose } from 'recompose';

const mapStateToProps = (state) => {
    return {
        carQuestions: state.carQuestions.questions,
        quoteSections: state.quote.quoteSections
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Quote);