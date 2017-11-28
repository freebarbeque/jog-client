import * as React from 'react';
import styled from 'styled-components';
import {DARK_GRAY} from '~/common/constants/palette';

interface IHeaderProps {}

const Header = styled.div`
    height: 80px;
    background-color: ${DARK_GRAY};
    display: flex;
    align-items: center;
`;

export default (props: IHeaderProps) => {
    return (
        <Header>
            111
        </Header>
    )
}