import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';

interface IFormSelectOption {
    id: number|string;
    name: string;
}

interface ISelectProps {
    input: {
        onChange: (value: any) => void;
        value: any;
    }
    options: IFormSelectOption[];
}

const Container = styled.div`
    width: 100%;
    display: flex;
    button {
        top: 0!important;
        right: 0!important;
    }
`;

class FormSelect extends React.Component<ISelectProps, {}> {

    private menu;

    handleChange = (event: any, index: number, value: any) => {
        this.props.input.onChange(`${value[value.length - 1]}`);
    }

    render() {
        return (
            <Container>
                <DropDownMenu
                    value={this.props.input.value || 'default'}
                    onChange={this.handleChange}
                    multiple
                    ref={ref => this.menu = ref}
                    style={{
                        width: 600,
                        backgroundColor: '#ECEDEF',
                    }}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    menuStyle={{
                        width: 500,
                        backgroundColor: '#ECEDEF',
                    }}
                    iconStyle={{
                        fill: 'black',
                    }}
                >
                    {this.props.options.map((o, i) => <MenuItem key={i} value={o.id} primaryText={o.name} onClick={() => this.menu.close()}/>)}
                    <MenuItem value="default" primaryText="Select an Option" style={{display: 'none'}}/>
                </DropDownMenu>
            </Container>
        )
    }
}

export default FormSelect;