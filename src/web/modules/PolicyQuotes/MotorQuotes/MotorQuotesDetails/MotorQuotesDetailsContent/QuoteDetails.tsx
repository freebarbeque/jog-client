import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';

import {Check, LeftDarkArrow} from 'src/web/images';

class QuoteDetails extends React.PureComponent<any, any> {
    render() {
        const { type, quote, backLink } = this.props;

        return (
            <Wrapper>
                <Container>
                    <Back onClick={() => this.props.push(backLink)}>
                        <LeftDarkArrow />Back to results
                    </Back>

                    <Card>
                        <Header>
                            {quote.logo}
                            <Stats>
                                <Owner>{quote.owner}</Owner>
                                <PriceList>
                                    <PriceListItemMain>
                                        <PriceListItemTitle>Per month</PriceListItemTitle>
                                        <PriceListItemValueMain>£30<span>.45</span></PriceListItemValueMain>
                                    </PriceListItemMain>
                                    <PriceListItemColumn>
                                        <PriceListItem type={type}>
                                            <PriceListItemTitle>Excess</PriceListItemTitle>
                                            <PriceListItemValue type={type}>£30.45</PriceListItemValue>
                                        </PriceListItem>
                                        {type === 'monthly' &&
                                            <PriceListItem type={type}>
                                                <PriceListItemTitle>Upfront</PriceListItemTitle>
                                                <PriceListItemValue type={type}>£65.45</PriceListItemValue>
                                            </PriceListItem>
                                        }
                                    </PriceListItemColumn>
                                </PriceList>
                            </Stats>
                        </Header>
                        <BenefitList>
                            <Benefit><Check/> Legal expenses</Benefit>
                            <Benefit><Check/> Personal accident</Benefit>
                            <Benefit><Check/> Windscreen cover</Benefit>
                            <Benefit><Check/> Courtesy car</Benefit>
                        </BenefitList>
                    </Card>
                </Container>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    position: relative;
`;

const Back = styled.div`
    position: absolute;
    top: 30px;
    left: 50px;
    display: flex;
    align-items: center;
    color: rgba(175, 175, 175, 1);
    cursor: pointer;
`;

const Container = styled.div`
    padding: 60px 0;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
`;

const Card = styled.div`
    width: 100%;
    padding: 20px 20px 0;
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 0 4px #E6E6E6;
    border-radius: 4px;
`;

const Header = styled.div`
    display: flex;
    border-bottom: 1px solid rgba(235, 235, 235, 1);
`;

const Stats = styled.div`
    margin-left: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const Owner = styled.div`
    padding: 5px 15px 10px;
    margin-bottom: 10px;
    display: flex;
    color: #000;
    font-size: 24px;
    border-bottom: 1px solid rgba(235, 235, 235, 1);
`;

const PriceList = styled.div`
    padding: 5px 0 10px;
    display: flex;
`;

const PriceListItemMain = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 15px;
    border-right: 1px solid rgba(235, 235, 235, 1);
`;

const PriceListItemColumn = styled.div`
    flex-grow: 1;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
`;

const PriceListItem = styled.div`
    display: flex;
    align-items: ${props => props.type === 'monthly' ? 'center' : 'stretch'};
    flex-direction: ${props => props.type === 'monthly' ? 'row' : 'column'};

    &:not(:last-child) {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid rgba(235, 235, 235, 1);
    }
`;

const PriceListItemTitle = styled.div`
    margin-right: 10px;
    font-size: 14px;
    text-transform: uppercase;
    color: rgba(175, 175, 175, 1)
`;

const PriceListItemValueMain = styled.div`
    font-weight: 700;
    font-size: 28px;
    color: rgba(25, 30, 65, 1);  
    
    span {
        font-size: 18px;
    }
`;

const PriceListItemValue = styled.div`
    color: rgba(155, 155, 165, 1);  
    font-size: ${props => props.type === 'monthly' ? '20px' : '26px'}
`;

const BenefitList = styled.div`
    display: flex;
    flex-direction: column;
`;

const Benefit = styled.div`
    padding: 15px 15px 15px 50px;
    display: flex;
    color: rgba(40, 50, 80, 1); 
    
    &:not(:last-child) {
        border-bottom: 1px solid rgba(235, 235, 235, 1);
    }
    
    img {
        margin-right: 15px;
    }
`;

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    push,
}, dispatch);

export default (connect(null, mapDispatchToProps)(QuoteDetails)) as any;
