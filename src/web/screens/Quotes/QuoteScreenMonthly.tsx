import * as React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import CurrentPolicy from 'src/web/screens/Dashboard/components/CurrentPolicy';
import PolicyTabsComponent from 'src/web/screens/Dashboard/components/PolicyTabs';
const  PolicyTabs: any = PolicyTabsComponent as any;
import Quote from './components/Quote';
import {BlackArrow} from 'src/web/images';
import Footer from 'src/web/components/Footer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {Avatar1, Avatar2} from 'src/web/images/index';

const tabs = [
    {
        title: 'Annual',
        link: '/annual'
    },
    {
        title: 'Monthly',
        link: '/monthly',
    }
];

const quotes = [
    {logo: <Avatar1/>, price: 100.01, excess: 50, owner: 'Aviva', extras: 7},
    {logo: <Avatar1/>, price: 231.00, excess: 115, owner: 'Aviva', extras: 4},
    {logo: <Avatar2/>, price: 456.00, excess: 228, owner: 'admiral', extras: 20},
    {logo: <Avatar1/>, price: 621.10, excess: 310, owner: 'Aviva', extras: 14},
];

const QuotesScreenMonthly = (props: any) => (
    <div className={props.className}>
        <Header/>
        <CurrentPolicy
            insurerAvatar="https://image.flaticon.com/icons/png/512/48/48982.png"
            insurerName="Default insurer"
            policyName="Motor Policy 1"
        />
        <PolicyTabs tabs={tabs}/>
        <Context>
            <Sort>Sort by <StyledBlackArrow height={10} width={10}/></Sort>
            <QuotesWrapper>
                {quotes.map((item, index) => (
                    <div key={index}>
                        <Quote logo={item.logo} price={item.price} excess={item.excess} owner={item.owner} extras={item.extras} onClick={() => props.push('/app/dashboard')}/>
                    </div>
                ))}
            </QuotesWrapper>
            <See><Text>See more</Text><BlackArrow height={10} width={10}/></See>
        </Context>
        <Footer/>
    </div>
);

const Text = styled.div`
    margin-right: 7px;
`;

const Context = styled.div`
    flex: 1;
    flex-direction: column;
    margin: 40px 20px;
`;

const StyledBlackArrow = styled(BlackArrow)`
    margin-left: 7px;
    transform: rotate(90deg);
`;

const StyledQuotesScreenMonthly = styled(QuotesScreenMonthly)`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-self: stretch;
    background-color: #F5F2E9;
    overflow-y: scroll;
`;

const QuotesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    flex: 1;
`;

const Sort = styled.div`
    display: flex;
    align-self: stretch;
    margin: 0 10px 10px 10px;
    color: #000;
    align-items: center;
`;

const See = styled.div`
    display: flex;
    align-self: stretch;
    margin: 10px 15px 0 15px;
    color: #000;
    align-items: center;
    justify-content: flex-end;
`;

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    push,
}, dispatch);

export default connect(null, mapDispatchToProps)(StyledQuotesScreenMonthly);