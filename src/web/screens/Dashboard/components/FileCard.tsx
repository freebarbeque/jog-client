import * as React from 'react';
import styled from 'styled-components';
import {PDFFile, PolicyCross} from 'src/web/images';
import {SECTION_HEADER_BG_COLOR, PINK, DARK_PINK} from 'src/common/constants/palette';
import {styledComponentWithProps} from 'src/common/utils/types';

interface IFileCard {
    className?: string;
    fileName?: string;
    onDeleteClick?: any;
}

interface IDeleteButtonProps {
    onClick?: any;
}

const IconContainer = styled.div`
    &:hover{
        cursor: pointer;
    }
`

const FileCard: React.StatelessComponent<IFileCard> = (props) => (
    <div className={props.className}>
        <Card>
            <DeleteButton onClick={props.onDeleteClick}>
                <PolicyCross/>
            </DeleteButton>
            <IconContainer onClick={() => console.log('Will open preview')}>
                <PDFFile/>
            </IconContainer>
        </Card>
        <FileName>
            {props.fileName}
        </FileName>
    </div>
);

const StyledFileCard = styled(FileCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 136px;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  flex: 0 0 100px;
  border-radius: 3.5px;
  background-color: ${SECTION_HEADER_BG_COLOR};
  box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
  margin-bottom: 15px;
  margin: 0 33px 15px 33px;
`;

const FileName = styled.div`
  align-self: stretch;
  color: #666B7F;
  font-size: 14px;
  line-height: 16px;
  word-wrap: break-word;
  padding: 0 10px;
  text-align: center;
`;

const button = styledComponentWithProps<IDeleteButtonProps, HTMLButtonElement>(styled.button);

const DeleteButton = button`
  position: absolute;
  cursor: pointer;
  background-color: ${PINK};
  right: 0;
  top: 0;
  padding: 3px 4px 4px 4px;
  box-shadow: none;
  border: none;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  outline: none;
  &:active {
    background-color: ${DARK_PINK};
  }
`;

export default StyledFileCard;