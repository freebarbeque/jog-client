import * as React from 'react';
import Input, {IInputProps} from 'src/web/components/Forms/Input';

const inputStyles = {
    border: '2px solid #dbdcde',
    borderRadius: 5,
    margin: 0,
    width: '100%',
    height: 48,
    boxSizing: 'border-box',
    fontSize: '16px',
};

export default (props: IInputProps) => {
        const {
            style,
            ...restProps,
        } = props;

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
