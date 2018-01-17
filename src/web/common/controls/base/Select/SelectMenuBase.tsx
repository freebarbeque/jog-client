import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class SelectMenuBase extends React.PureComponent<any, any> {
    static defaultProps = {
        autoWidth: false,
        placeholder: 'Select an option',
        value: null,
    };

    renderOption = (option: any) => {
        return <MenuItem key={option.id} value={option.id} primaryText={option.name} />
    };

    handleChange = (event, index, selected) => {
        this.props.onChange(selected);
    };

    render() {
        const {
            value,
            options,
            placeholder,
            autoWidth,
            rootStyle,
            menuStyle,
            iconStyle,
            labelStyle,
        } = this.props;

        return (
            <DropDownMenu
                value={value || 'default'}
                onChange={this.handleChange}
                style={{
                    width: '100%',
                    height: 40,
                    fontFamily: 'Work Sans',
                    ...rootStyle,
                }}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                menuStyle={{
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
                    top: 0,
                    fill: 'black',
                    ...iconStyle,
                }}
                labelStyle={{
                    opacity: 1,
                    top: 0,
                    height: 40,
                    lineHeight: 40,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 18,
                    ...labelStyle,
                }}
                autoWidth={autoWidth}
                underlineStyle={{display: 'none'}}
                selectedMenuItemStyle={{backgroundColor: '#50E3C2'}}
            >
                <MenuItem value={'default'} primaryText={placeholder} style={{display: 'none'}}/>
                {options.map(this.renderOption)}
            </DropDownMenu>
        )
    }
}

export default SelectMenuBase;
