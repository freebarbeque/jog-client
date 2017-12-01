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

const tabs = [
    {
        title: 'Annual',
        link: '/annual'
    },
    {
        title: 'Monthly',
        link: '/monthly',
        disabled: true,
    }
];

const quotes = [
    {logo: 'http://icons.iconarchive.com/icons/blackvariant/button-ui-requests-4/1024/Autodesk-360-icon.png', price: 100.01, excess: 50, owner: 'Avangard', extras: 7},
    {logo: 'http://www.buildingmobilebritain.org.uk/wp-content/uploads/2017/07/y4.png', price: 231.00, excess: 115, owner: 'plus', extras: 4},
    {logo: 'http://www.buildingmobilebritain.org.uk/wp-content/uploads/2017/07/y4.png', price: 456.00, excess: 228, owner: 'plus', extras: 20},
    {logo: 'https://image.flaticon.com/icons/png/512/48/48982.png', price: 621.10, excess: 310, owner: 'admiral', extras: 14},
    {logo: 'https://image.flaticon.com/icons/png/512/48/48982.png', price: 984.00, excess: 492, owner: 'admiral', extras: 4},
    {logo: 'http://icons.iconarchive.com/icons/blackvariant/button-ui-requests-4/1024/Autodesk-360-icon.png', price: 1000.00, excess: 500, owner: 'Avangard', extras: 3},
    {logo: 'http://www.newdesignfile.com/postpic/2014/10/procedure-policy-standards-icon_74483.png', price: 1200.00, excess: 600, owner: 'green list', extras: 11},
    {logo: 'http://www.newdesignfile.com/postpic/2014/10/procedure-policy-standards-icon_74483.png', price: 2000.00, excess: 1000, owner: 'green list', extras: 5},
];

const QuotesScreen = (props: any) => (
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

const StyledQuotesScreen = styled(QuotesScreen)`
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

export default connect(null, mapDispatchToProps)(StyledQuotesScreen);