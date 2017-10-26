import { connect } from "react-redux";
import PolicyInfo from "./components/PolicyInfo";
import { compose, withState, withHandlers, withPropsOnChange } from 'recompose';

export default compose(
    connect((state, props) => {
        
        return {
            policyInfoState: state.policyInfo
        }
    }),
    withPropsOnChange([], (props) => {
        
        
        return {
          
        }
    })
)(PolicyInfo)

