import { connect } from "react-redux";
import Header from "./components/Header";
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
)(Header)

