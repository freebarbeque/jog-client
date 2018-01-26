import * as React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import {
    FIELD_RADIO_SELECTED_COLOR,
    FIELD_PLACEHOLDER_COLOR,
    FIELD_TEXT_COLOR
} from 'src/common/constants/palette';

class RadioGroup extends React.PureComponent<any, any> {
    renderOption = option => {
      const { value } = this.props;

      return (
          <RadioButton
              key={option.id}
              value={option.id}
              label={option.name}
              style={{
                  paddingRight: 35,
                  width: 'auto',
                  whiteSpace: 'nowrap',
              }}
              labelStyle={{
                  fontFamily: 'Work Sans',
                  color: `${value === option.id ? FIELD_TEXT_COLOR : FIELD_PLACEHOLDER_COLOR}`,
              }}
              iconStyle={{
                  marginRight: 10,
                  display: 'flex',
                  fill: `${value === option.id ? FIELD_RADIO_SELECTED_COLOR : FIELD_PLACEHOLDER_COLOR}`,
                  transition: 'none',
              }}
              disableTouchRipple
          />
      );
    };

    render() {
        const {
            name,
            value,
            options,
            onChange,
            defaultSelected,
            inputProps,
        } = this.props;

        const radioGroupStyles = {
            display: 'flex',
            fontSize: 20,
            fontWeight: 300,
        };

        return (
            <RadioButtonGroup
                name={name}
                defaultSelected={defaultSelected}
                valueSelected={value}
                onChange={(event: any, value: any) => onChange(value)}
                style={radioGroupStyles}
            >
                {options.map(this.renderOption)}
            </RadioButtonGroup>
        )
    }
}

export default RadioGroup;
