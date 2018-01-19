import * as React from 'react';

import { ModernSelect } from '../Select';

import { Container, Item } from './styled';

class DatePickerContent extends React.PureComponent<any, any> {
    static defaultProps = {
        name: '',
        dataSource: [],
        selectProps: {
            autoWidth: false,
            valid: false,
            invalid: false,
        },
    };

    render() {
        const {
            name,
            dataSource,
            selectProps,
        } = this.props;

        return (
            <Container name={name}>
                {dataSource.map((fragment, index) => (
                    <Item key={index} style={fragment.rootStyles}>
                       <ModernSelect
                           placeholder={fragment.placeholder}
                           value={fragment.value}
                           options={fragment.options}
                           onChange={fragment.onChange}
                           {...selectProps}
                       />
                    </Item>
                ))}
            </Container>
        )
    }
}

export default DatePickerContent;
