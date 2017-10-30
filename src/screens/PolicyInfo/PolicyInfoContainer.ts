import { connect } from "react-redux";
import PolicyInfo from "./components/PolicyInfo";

const mapStateToProps = (state) => {
    console.log('state', state);
    
    return {
        localState: state.policyInfo
    }
};

const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps', dispatch);
    
    return {

    }
};

export default connect(mapStateToProps)(PolicyInfo);

