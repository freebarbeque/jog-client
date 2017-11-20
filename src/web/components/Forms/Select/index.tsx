import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

interface ISelectProps {
    input: {
        onChange: (value: any) => void;
        value: any;
    }
}

class FormSelect extends React.Component<ISelectProps, {}> {

    private menu;

    handleChange = (event: any, index: number, value: any) => {
        this.props.input.onChange(`${value[value.length - 1]}`);
    }

    render () {
        return (
            <DropDownMenu
                value={this.props.input.value}
                onChange={this.handleChange}
                multiple
                ref={ref => this.menu = ref}
                style={{
                    width: 300,
                    backgroundColor: '#ECEDEF',
                }}
            >
                <MenuItem value={1} primaryText="Never" onClick={() => this.menu.close()} />
                <MenuItem value={2} primaryText="Every Night" onClick={() => this.menu.close()} />
                <MenuItem value={3} primaryText="Weeknights" onClick={() => this.menu.close()} />
            </DropDownMenu>
        )
    }
}

export default FormSelect;