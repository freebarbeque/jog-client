import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import styled, {StyledComponentClass} from 'styled-components';
import {IDataSource} from '~/common/interfaces/dataSource';
import ErrorText from 'src/web/components/Forms/ErrorText';

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
}

interface IContainerProps {
    error: string|undefined;
    touched: boolean;
}

const Container: StyledComponentClass<IContainerProps, any, any> = styled.div`
    display: flex;
    button {
        top: 0!important;
        right: 0!important;
    }
    border: ${(props: IContainerProps) => props.error && props.touched ? '1px solid red' : 'none'}
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
            meta: {error, touched},
        } = this.props;

        return (
            <div>
                <Container error={error} touched={touched}>
                    <DropDownMenu
                        value={input.value ? [+input.value] : 'default'}
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