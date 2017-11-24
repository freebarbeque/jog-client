import * as React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Description from './components/Description';
import {CREAM} from 'src/common/constants/palette';
import Divider from './components/Divider';
import BenefitsSection from './components/BenefitsSection';
import Footer from '../../components/Footer';
import {RedSubmitArrow} from '../../images';
import {LANDING_INPUT_BG_COLOR, FOOTER_BACKGROUND_COLOR, PINK} from 'src/common/constants/palette';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {ActionCreator, Action, bindActionCreators} from 'redux';
import {ReactElement} from 'react';

const Button = styled.button`
  width: 300px;
  flex: 1;
  background-color: ${LANDING_INPUT_BG_COLOR};
  color: ${FOOTER_BACKGROUND_COLOR};
  height: 56px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  padding: 0;
  border-radius: 0;
  border-top-right-radius: 31px;
  border-top-left-radius: 31px;
  border-bottom-right-radius: 31px;
  border-bottom-left-radius: 31px;
  cursor: pointer;
  &:hover {
    background-color: #D3D3D5;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 16px;
`;

const ButtonTitle = styled.div`
`;

interface IButtonProps {
    push: ActionCreator<Action>;
}

const button = (props: IButtonProps): ReactElement<IButtonProps> => (
    <Button
        type="submit"
    >
        <ButtonContent>
            <div/>
            <ButtonTitle onClick={() => props.push('/app/dashboard/motor')}>
                Add a policy to get started
            </ButtonTitle>
            <RedSubmitArrow width={13} height={20}/>
        </ButtonContent>
    </Button>
)

interface ILandingPageProps {
    push: ActionCreator<Action>;
    className: string;
}

const LandingScreen = (props: ILandingPageProps) => {
    return (
        <div className={props.className}>
            <Header />
            <Description button={button(props)} />
            <Content>
                <Divider />
                <BenefitsSection />
            </Content>
            <Footer />
        </div>
    );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 10px 45px 50px 45px;
  flex-shrink: 0;
`;

const StyledLandingScreen = styled(LandingScreen)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: stretch;
  background-color: ${CREAM};
  overflow-y: scroll;
`;

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    push,
}, dispatch);

export default connect(null, mapDispatchToProps)(StyledLandingScreen);