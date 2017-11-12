import { connect } from 'react-redux';
import PolicyInfo from './components/PolicyInfo';
import { getCarCompletedPercent } from '../Quote/QuoteContainer';

const getCurrentTab = (tabIndex) => {
    switch (tabIndex) {
        case 0: return 'Overview';
        case 1: return 'Documents';
        case 2: return 'Quote';
        default: return '';
    }
}

const mapStateToProps = (state) => {
    return {
        localState: state.policyInfo,
        currentTab: getCurrentTab(state.policyInfo.index),
        carCompletedPercent: getCarCompletedPercent(state.carQuestions.questions)
    }
};

export default connect(mapStateToProps)(PolicyInfo);
