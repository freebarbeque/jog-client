import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import styled from 'styled-components';
import {DownArrow} from 'src/web/images';

interface ISelectProps {
    input: {
        onChange: (value: any) => void;
        value: any;
    }
}

const Container = styled.div`
    width: 100%;
    display: flex;
    button {
        top: 0!important;
        right: 0!important;
        border-left: 1px solid #bbb!important;
        border-radius: 0!important;
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
                    value={this.props.input.value}
                    onChange={this.handleChange}
                    multiple
                    ref={ref => this.menu = ref}
                    style={{
                        width: 600,
                        backgroundColor: '#ECEDEF',
                    }}
                    iconButton={<DownArrow/>}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    menuStyle={{
                        width: 500,
                        backgroundColor: '#ECEDEF',
                    }}
                >
                    <MenuItem value={1} primaryText="Never" onClick={() => this.menu.close()}/>
                    <MenuItem value={2} primaryText="Every Night" onClick={() => this.menu.close()}/>
                    <MenuItem value={3} primaryText="Weeknights" onClick={() => this.menu.close()}/>
                </DropDownMenu>
            </Container>
        )
    }
}

export default FormSelect;