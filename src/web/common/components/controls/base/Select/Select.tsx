import * as React from 'react';
import Select from 'react-select';

import { getValidationColor } from 'src/web/common/utils/form/validationColor';

class SelectBase extends React.PureComponent<any, any> {
    static defaultProps = {
        disabled: false,
        placeholder: 'Select your option',
    };

    handleChange = option => {
        const { onChange } = this.props;
        option ? onChange(option.value) : onChange(null);
    };

    render() {
        const { value, options, placeholder, disabled, valid, invalid } = this.props;

        return (
            <Select
                value={value}
                options={options}
                onChange={this.handleChange}
                disabled={disabled}
                placeholder={placeholder}
                className="select-field"
                style={{
                    borderBottom: `1px solid ${getValidationColor(valid, invalid)}`,
                }}
            />
        );
    }
}

export default SelectBase;
