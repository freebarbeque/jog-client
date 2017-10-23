import { connect } from "react-redux";
import Home from "./components/Home";
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
)(Home) 

