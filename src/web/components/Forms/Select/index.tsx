import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';
import {IDataSource} from '~/common/interfaces/dataSource';

interface ISelectProps {
    input: {
        onChange: (value: any) => void;
        value: any;
    },
    dataSource: IDataSource[];
    style: any;
    menuStyle: any;
    defaultText?: string;
}

const Container = styled.div`
    display: flex;
    button {
        top: 0!important;
        right: 0!important;
    }
`;

class FormSelect extends React.Component<ISelectProps, {}> {

    private menu;

    handleChange = (event: any, index: number, value: any) => {
        const valueToSet = value[value.length - 1];
        if (valueToSet) {
            this.props.input.onChange(`${valueToSet}`);
        }
    }

    render() {
        const {
            input,
            dataSource,
            style,
            menuStyle,
            defaultText,
        } = this.props;

        return (
            <Container>
                <DropDownMenu
                    value={input.value || 'default'}
                    onChange={this.handleChange}
                    multiple
                    ref={ref => this.menu = ref}
                    style={{
                        width: 600,
                        backgroundColor: '#ECEDEF',
                        ...style,
                    }}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    menuStyle={{
                        width: 600,
                        backgroundColor: '#ECEDEF',
                        ...menuStyle,
                    }}
                    iconStyle={{
                        fill: 'black',
                    }}
                    labelStyle={{opacity: 1, top: 0}}
                    autoWidth={false}
                >
                    {dataSource.map((o, i) => <MenuItem key={i} value={o.id} primaryText={o.name} onClick={() => this.menu.close()}/>)}
                    <MenuItem value="default" primaryText={defaultText || 'Select an Option'} style={{display: 'none'}}/>
                </DropDownMenu>
            </Container>
        )
    }
}

export default FormSelect;