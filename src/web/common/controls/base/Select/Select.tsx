import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import ErrorText from 'src/web/components/Forms/ErrorText';

import { Container, Wrapper } from './styled';

interface ISelectProps {
    onChange: (value: any) => void;
    errorMessage?: string;
    value?: number|string|undefined;
    options: any[];
    placeholder?: string;
    autoWidth?: boolean;
    style?: any;
    menuStyle?: any;
    iconStyle?: any;
    labelStyle?: any;
    valid: boolean;
    invalid: boolean;
}

class Select extends React.PureComponent<ISelectProps, any> {
    handleChange = (event, index, selected) => {
        this.props.onChange(selected);
    };

    renderOption = (option: any) => {
        return <MenuItem key={option.id} value={option.id} primaryText={option.name} />
    };

    renderErrorMessage = () => {
        const { errorMessage } = this.props;
        return <div><ErrorText>{errorMessage}</ErrorText></div>;
    };

    render() {
        const {
            value,
            options,
            placeholder,
            autoWidth,
            style,
            menuStyle,
            iconStyle,
            labelStyle,
            errorMessage,
            valid,
            invalid,
        } = this.props;

        return (
            <Wrapper>
                <Container>
                    <DropDownMenu
                        value={value || 'default'}
                        onChange={this.handleChange}
                        style={{
                            width: '100%',
                            borderBottom: `${invalid ? '1px solid red' : valid ? '1px solid #50e3c2' : '1px solid #D9DEE3'}`,
                            fontFamily: 'Work Sans',
                            ...style,
                        }}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                        menuStyle={{
                            backgroundColor: '#FFF',
                            maxHeight: '300px',
                            ...menuStyle,
                        }}
                        menuItemStyle={{
                            fontFamily: 'Work Sans',
                        }}
                        listStyle={{
                            border: '1px solid #D8DDE6',
                            borderRadius: '4px',
                            overflow: 'hidden',
                        }}
                        iconStyle={{
                            fill: 'black',
                            ...iconStyle,
                        }}
                        labelStyle={{opacity: 1, top: 0, height: 48, lineHeight: 48, display: 'flex', alignItems: 'center', fontSize: 16, paddingLeft: 12, ...labelStyle}}
                        autoWidth={autoWidth || false}
                        underlineStyle={{display: 'none'}}
                        selectedMenuItemStyle={{backgroundColor: '#50E3C2'}}
                    >
                        <MenuItem value={'default'} primaryText={placeholder || 'Select an Option'} style={{display: 'none'}}/>
                        {options.map(this.renderOption)}
                    </DropDownMenu>
                </Container>
                {errorMessage && this.renderErrorMessage()}
            </Wrapper>
        );
    }
}

export default Select;
