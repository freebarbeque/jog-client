import * as React from 'react';

import { ModernSelect } from '../Select';

import { Container, Item } from './styled';

class DatePickerContent extends React.PureComponent<any, any> {
    render() {
        const {
            name,
            valid,
            invalid,
            dataSource,
        } = this.props;

        return (
            <Container name={name}>
                {dataSource.map((fragment, index) => (
                    <Item key={index} style={fragment.rootStyles}>
                       <ModernSelect
                           valid={valid}
                           invalid={invalid}
                           placeholder={fragment.placeholder}
                           value={fragment.value}
                           options={fragment.options}
                           onChange={fragment.onChange}
                       />
                    </Item>
                ))}
            </Container>
        )
    }
}

export default DatePickerContent;
