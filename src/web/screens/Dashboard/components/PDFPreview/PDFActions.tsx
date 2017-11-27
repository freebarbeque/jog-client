import * as React from 'react';
import styled from 'styled-components';
import RoundedButton from 'src/web/components/RoundedButton';

interface IPDFActions {
    onClose: () => void;
}

const Container = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default (props: IPDFActions) => (
    <Container>
        <RoundedButton
            label="Close"
            onClick={props.onClose}
        />
    </Container>
)
