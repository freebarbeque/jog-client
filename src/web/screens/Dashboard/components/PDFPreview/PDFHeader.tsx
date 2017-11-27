import * as React from 'react';
import {DARK_GRAY, WHITE} from '~/common/constants/palette';
import styled from 'styled-components';
import {Cross} from 'src/web/images';

interface IPDFHeaderProps {
    name?: string;
    onClose: () => void;
}

const Header = styled.div`
    height: 40px;
    background-color: ${DARK_GRAY};
    color: ${WHITE}!important;
    padding: 0 20px!important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px!important;
`;

const Button = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

export default (props: IPDFHeaderProps) => (
    <div style={{padding: 0}}>
        <Header>
            <div>{props.name}</div>
            <Button onClick={props.onClose}><Cross/></Button>
        </Header>
        <div style={{height: 1}}/>
    </div>
)