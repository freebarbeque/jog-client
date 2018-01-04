import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Select extends React.PureComponent<any, any> {
    private select;

    // https://github.com/mui-org/material-ui/issues/9722
    // DropDownMenu: without multiple = true callback [onChange] doesn't fired
    handleChange = (event, index, activeValues) => {
        if (activeValues.length) {
            const selected = activeValues.pop();
            this.props.onChange([selected]);
        }
    };

    renderOption = (option: any) => {
        return <MenuItem style={{ width: '500px' }} key={option.id} value={option.id} primaryText={option.name} onClick={() => this.select.close()}/>
    };

    render() {
        const {
            value,
            options,
        } = this.props;

        return (
            <DropDownMenu
                multiple
                ref={(ref) => this.select = ref}
                value={value || 'default'}
                onChange={this.handleChange}
                selectedMenuItemStyle={{color: 'red'}}
            >
                <MenuItem value={'default'} primaryText={'Select an Option'} style={{display: 'none'}}/>
                {options.map(this.renderOption)}
            </DropDownMenu>
        );
    }
}

export default Select;
