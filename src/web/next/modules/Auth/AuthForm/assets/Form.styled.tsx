import styled from 'styled-components';
import { lighten } from 'polished';

import { DARK_GRAY } from 'src/common/constants/palette';

export const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    
    form {
        display: flex;
        flex-direction: column;
    }
`;

export const FormBody = styled.div`
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
`;

export const FormLinks = styled.div`
    display: flex;
    justify-content: space-between;
    
    a {
        color: ${DARK_GRAY} !important;
        transition: 0.2s;
    }
    
    a:hover {
        color: ${lighten(0.2, DARK_GRAY)} !important;
    }
`;

export const FormFooter = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FormField = styled.div`
    &:not(:last-child) {
        margin-bottom: 20px;
    }
`;
