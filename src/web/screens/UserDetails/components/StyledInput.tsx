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
