import * as React from 'react';

import { getValidationColor } from 'src/web/common/utils/validationColor';
import { FIELD_PLACEHOLDER_COLOR, FIELD_TEXT_COLOR } from 'src/common/constants/palette';

import SelectMenuBase from './SelectMenuBase';

class ModernSelect extends React.PureComponent<any, any> {
    render() {
        const { value, valid, invalid } = this.props;

        return (
            <SelectMenuBase
                rootStyle={{
                    borderBottom: `1px solid ${getValidationColor(valid, invalid)}`,
                }}
                menuStyle={{
                    backgroundColor: '#FFF',
                }}
                iconStyle={null}
                labelStyle={{
                    paddingLeft: 0,
                    color: value ? FIELD_TEXT_COLOR : FIELD_PLACEHOLDER_COLOR,
                }}
                {...this.props}
            />
        )
    }
}

export default ModernSelect;
