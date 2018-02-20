import * as React from 'react';
import styled from 'styled-components';
import { BLUE, DARK_GRAY } from 'src/common/constants/palette';

const CancelIcon = props => (
    <svg
        className={props.className}
        viewBox="0 0 15 14"
        onClick={props.onClick}
    >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1185.000000, -461.000000)">
                <g>
                    <path d="M1198.81412,472.741959 L1194.10466,468.0325 L1198.87691,463.32304 C1199.12809,463.071868 1199.12809,462.820699 1198.87691,462.569527 L1197.49547,461.250878 C1197.36989,461.125292 1197.2443,461.0625 1197.11872,461.0625 C1197.03499,461.0625 1196.93034,461.125292 1196.80475,461.250878 L1192.0325,465.897545 L1187.26025,461.250878 C1187.13466,461.125292 1187.03001,461.0625 1186.94628,461.0625 C1186.8207,461.0625 1186.69511,461.125292 1186.56953,461.250878 L1185.25088,462.569527 C1184.99971,462.820699 1184.99971,463.071868 1185.25088,463.32304 L1190.02313,468.0325 L1185.25088,472.804752 C1185.16715,472.846614 1185.12529,472.951268 1185.12529,473.118716 C1185.12529,473.286164 1185.16715,473.411748 1185.25088,473.495473 L1186.56953,474.876914 C1186.65325,474.960638 1186.77884,475.0025 1186.94628,475.0025 C1187.11373,475.0025 1187.23932,474.960638 1187.32304,474.876914 L1192.0325,470.104662 L1196.80475,474.814121 C1196.93034,474.939707 1197.03499,475.0025 1197.11872,475.0025 C1197.2443,475.0025 1197.36989,474.939707 1197.49547,474.814121 L1198.81412,473.495473 C1198.93971,473.411748 1199.0025,473.286164 1199.0025,473.118716 C1199.0025,472.99313 1198.93971,472.867545 1198.81412,472.741959 Z" />
                </g>
            </g>
        </g>
    </svg>
);

const StyledCancelIcon = styled(CancelIcon)`
    margin: 0 0 0 10px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    & > g > g {
        color: ${BLUE};
        fill: ${BLUE};
    }
    &:hover {
        & > g > g {
            color: ${DARK_GRAY};
            fill: ${DARK_GRAY};
        }
    }
`;

export default StyledCancelIcon;