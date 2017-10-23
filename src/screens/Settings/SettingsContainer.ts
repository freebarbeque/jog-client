import { connect } from "react-redux";
import Settings from "./components/Settings";
import { compose } from 'recompose';

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Settings) 

