import * as React from 'react';
import styled from 'styled-components';
import {BLUE} from '~/common/constants/palette';

interface IPrepopulatedFieldProps {
    value: string|number;
}

const PrepopulatedField = styled.div`
    border: 2px solid #dbdcde;
    border-radius: 5px;
    margin-top: 0;
    margin-bottom: 20px;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 16px;
    background-color: #dbdcde;
    color: ${BLUE};
    display: flex;
    align-items: center;
`

export default (props: IPrepopulatedFieldProps) => {
    return (
        <PrepopulatedField>{props.value}</PrepopulatedField>
    )
}