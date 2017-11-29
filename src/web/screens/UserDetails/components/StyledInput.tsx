import * as React from 'react';
import Input, {IInputProps} from 'src/web/components/Forms/Input';

const inputStyles = {
    border: '2px solid #dbdcde',
    borderRadius: 5,
    marginTop: 0,
    width: '100%',
    height: 40,
    boxSizing: 'border-box',
    padding: '0 10px',
    fontSize: '16px',
};

class StyledInput extends React.Component<IInputProps, {}> {
    private defaultProps = {
        style: {},
    }

    render() {
        const {
            children,
            style,
            ...restProps,
        } = this.props;

        return (
            <Input
                {...restProps}
                style={
                    {
                        ...inputStyles,
                        ...style,
                    }
                }
            />
        )
    }
}

export default StyledInput;