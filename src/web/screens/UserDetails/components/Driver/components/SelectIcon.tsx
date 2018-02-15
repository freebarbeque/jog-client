import * as React from 'react';
import styled from 'styled-components';
import { BLUE, DARK_GRAY } from 'src/common/constants/palette';

const SelectIcon = props => (
    <svg
        viewBox="0 0 68 65"
        className={props.className}
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
    >
        <path d="M0 39.56a6.61 6.61 0 0 1 2.26-3.5c1.31-1.25 2.56-2.56 3.84-3.84a3.69 3.69 0 0 1 5.71 0q6.36 6.33 12.69 12.68c.25.25.5.48.81.77l2-3L54.75 2.29c1.77-2.61 3.62-3 6.22-1.19 1.42 1 2.8 2 4.26 2.87a5.27 5.27 0 0 1 2.87 3.77v.2a17.65 17.65 0 0 1-1.21 2.6Q49.38 36.43 31.83 62.28a11 11 0 0 1-1.13 1.45c-1.57 1.64-3.46 2.34-5.61 1.4A11 11 0 0 1 21.82 63c-6.56-6.47-13-13-19.57-19.51A6.77 6.77 0 0 1 0 39.95v-.39z" />
    </svg>
);

const StyledSelectIcon = styled(SelectIcon)`
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

export default StyledSelectIcon;
