import * as React from 'react';

import Select from '../Select';

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
                       <Select
                           placeholder={fragment.placeholder}
                           value={fragment.value}
                           options={fragment.options.map(o => ({ value: o.id, label: o.name }))}
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
