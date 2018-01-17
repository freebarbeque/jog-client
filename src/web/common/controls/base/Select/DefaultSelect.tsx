import * as React from 'react';

import { FIELD_BACKGROUND_LIGHT_GRAY, FIELD_TEXT_COLOR } from 'src/common/constants/palette';

import SelectMenuBase from './SelectMenuBase';

class DefaultSelect extends React.PureComponent<any, any> {
    render() {
        const { value, valid, invalid } = this.props;

        return (
            <SelectMenuBase
                rootStyle={null}
                menuStyle={{
                    backgroundColor: '#FFF',
                }}
                iconStyle={null}
                labelStyle={{
                    paddingLeft: 10,
                    borderRadius: 4,
                    color: FIELD_TEXT_COLOR,
                    backgroundColor: FIELD_BACKGROUND_LIGHT_GRAY,
                }}
                {...this.props}
            />
        )
    }
}

export default DefaultSelect;
