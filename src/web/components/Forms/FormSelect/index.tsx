import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import styled, {StyledComponentClass} from 'styled-components';
import {IDataSource} from '~/common/interfaces/dataSource';
import ErrorText from 'src/web/components/Forms/ErrorText';
import {isUndefined} from 'util';

interface ISelectProps {
    input: {
        onChange: (value: any) => void;
        value: any;
    },
    meta: {
        error?: string;
        touched: boolean;
    },
    dataSource: IDataSource[];
    style: any;
    menuStyle: any;
    defaultText?: string;
    maxHeight?: number;
    labelStyle?: any;
    iconStyle?: any;
    autoWidth?: boolean;
    onChangeCallback?: (value: any) => void;
}

interface IContainerProps {
    error: string|undefined;
    touched: boolean;
}

const Container: StyledComponentClass<IContainerProps, any, any> = styled.div`
    display: flex;
    border-radius: 3.5px;
    overflow: hidden;
    button {
        top: 0!important;
        right: 0!important;
    }
    border: ${(props: IContainerProps) => props.error && props.touched ? '1px solid red' : '1px solid transparent'};
`;

class FormSelect extends React.Component<ISelectProps, {}> {

    private menu;

    handleChange = (event: any, index: number, value: any) => {
        const valueToSet = value[value.length - 1];
        if (!isUndefined(valueToSet)) {
            this.props.input.onChange(valueToSet);
            this.props.onChangeCallback && this.props.onChangeCallback(valueToSet);
        }
    }

    render() {
        const {
            input,
            dataSource,
            style,
            menuStyle,
            defaultText,
            maxHeight,
            labelStyle,
            iconStyle,
            autoWidth,
            meta: {error, touched},
        } = this.props;

        return (
            <div>
                <Container error={error} touched={touched}>
                    <DropDownMenu
                        value={input.value ? [input.value] : 'default'}
                        onChange={this.handleChange}
                        multiple
                        ref={ref => this.menu = ref}
                        style={{
                            width: '100%',
                            backgroundColor: '#ECEDEF',
                            fontFamily: 'Work Sans',
                            ...style,
                        }}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                        menuStyle={{
                            backgroundColor: '#FFF',
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
                        maxHeight={maxHeight}
                    >
                        {dataSource.map((o, i) => <MenuItem key={i} value={o.id} primaryText={o.name} onClick={() => this.menu.close()}/>)}
                        <MenuItem value="default" primaryText={defaultText || 'Select an Option'} style={{display: 'none'}}/>
                    </DropDownMenu>
                </Container>
                {
                    error && touched &&
                    <div>
                        <ErrorText>
                            {error}
                        </ErrorText>
                    </div>
                }
            </div>
        )
    }
}

export default FormSelect;