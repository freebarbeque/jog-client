import * as React from 'react';
import styled from 'styled-components';
import Avatar from 'src/web/components/Avatar';
import {BlackArrow} from 'src/web/images';

const QuotesListItem = (props: any) => (
    <div className={props.className} onClick={props.onClick}>
        <QuoteDescription>
            <LeftSide>
                {props.quote.logo}
                <Price><IntegerPartOfPrice>£{Math.floor(props.quote.price)}</IntegerPartOfPrice><FloatPartOfPrice>.{props.quote.price.toString().split('.')[1] ? props.quote.price.toString().split('.')[1] : '00'}</FloatPartOfPrice></Price>
                <PriceColor><IntegerPartOfPrice>£{props.quote.excess}</IntegerPartOfPrice><Excess>EXCESS</Excess></PriceColor>
                {props.quote.upfront && <PriceColor><IntegerPartOfPrice>£{props.quote.upfront}</IntegerPartOfPrice><Excess>UPFRONT</Excess></PriceColor>}
            </LeftSide>
            <RightSide><BlackArrow/></RightSide>
        </QuoteDescription>
        <OwnerDescription>
            <Text>{props.quote.owner.toLocaleUpperCase()}</Text>
            <Text>{props.quote.extras} EXTRAS</Text>
        </OwnerDescription>
    </div>
);

const StyledQuote = styled(QuotesListItem)`
  display: flex;
  align-self: stretch;
  flex-direction: column;
  color: #000;
  cursor: pointer;
`;

const StyledAvatar = styled(Avatar)`
    width: 50px;
    height: 50px;
    box-shadow: 0 0 10px black;
`;

const QuoteDescription = styled.div`
    display: flex;
    align-self: stretch;
    background: #FFF;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;
`;

const OwnerDescription = styled.div`
    display: flex;
    align-self: stretch;
    background: #E6E6E6;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #DCDCD8;
`;

const Text = styled.div`
    color: #495C78;
`;

const LeftSide = styled.div`
    display: flex;
    align-items: center;
`;

const RightSide = styled.div`
    display: flex;
`;

const PriceColor = styled.div`
    display: flex;
    padding: 0 15px;
    color: #BABDC3;
    font-weight: 600;
    border-left: 1px solid #BABDC3; 
`;

const Price = styled.div`
    display: flex;
    margin: 0 15px;
    color: #252D4B;
    font-weight: 700;   
`;

const IntegerPartOfPrice = styled.div`
    font-size: 24px;
`;

const FloatPartOfPrice = styled.div`
    padding-top: 4.5px;
    font-size: 18px;
`;

const Excess = styled.div`
    color: #BABDC3;
    font-weight: 700;
    font-size: 18px;
    padding-top: 4.5px;
    margin-left: 7px;

`;

export default StyledQuote;