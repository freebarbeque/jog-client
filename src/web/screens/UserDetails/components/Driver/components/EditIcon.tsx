import * as React from 'react';
import styled from 'styled-components';
import { BLUE, DARK_GRAY } from 'src/common/constants/palette';

const EditIcon = props => (
    <svg
        viewBox="0 0 1000 1000"
        className={props.className}
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
    >
        <path d="M979.2 230.8l-210-210c-14.5-14.6-38.2-14.4-52.9.3L117.6 619.8c-.9.9-1.2 2.3-2 3.3-1.6 2-3.5 3.5-4.8 5.8-.7 1.3-.7 2.6-1.2 4-.3.9-1.2 1.5-1.5 2.5L11.5 942.1c-8.4 26.6 19.9 54.8 46.4 46.4l306.8-96.7c.9-.3 1.5-1.1 2.4-1.5 1.3-.5 2.7-.5 4-1.2 2.4-1.2 3.9-3.2 5.9-4.8 1-.8 2.3-1 3.2-2l478.9-478.9 119.7-119.7c14.8-14.8 14.9-38.4.4-52.9zM364 793.5l-48.5-93.4c-1.8-3.4-4-6.4-6.6-9s-5.6-4.9-9-6.6L206.5 636l416-416L780 377.5l-416 416zM166 700l88.3 45.8L300 834l-195.8 61.7L166 700zm667.3-375.8L675.8 166.7l66.3-66.3 157.5 157.5-66.3 66.3z" />
    </svg>
);

const StyledEditIcon = styled(EditIcon)`
    margin: 0 0 0 10px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    & > path {
        color: ${BLUE};
        fill: ${BLUE};
    }
    &:hover {
        & > path {
            color: ${DARK_GRAY};
            fill: ${DARK_GRAY};
        }
    }
`;

export default StyledEditIcon;
