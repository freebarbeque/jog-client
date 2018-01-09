import * as React from 'react';
import {connect} from 'react-redux';

import {Avatar1, Avatar2} from 'src/web/images';

import QuotesList from './QuotesList';

const quotesAnnual = [
    {id: 1, logo: <Avatar1/>, price: 100.01, excess: 50, owner: 'Aviva', extras: 7},
    {id: 2, logo: <Avatar1/>, price: 231.00, excess: 115, owner: 'Aviva', extras: 4},
    {id: 3, logo: <Avatar2/>, price: 456.00, excess: 228, owner: 'admiral', extras: 20},
    {id: 4, logo: <Avatar1/>, price: 621.10, excess: 310, owner: 'Aviva', extras: 14},
    {id: 5, logo: <Avatar2/>, price: 984.00, excess: 492, owner: 'admiral', extras: 4},
    {id: 6, logo: <Avatar1/>, price: 1000.00, excess: 500, owner: 'Aviva', extras: 3},
    {id: 7, logo: <Avatar2/>, price: 1200.00, excess: 600, owner: 'admiral', extras: 11},
    {id: 8, logo: <Avatar1/>, price: 2000.00, excess: 1000, owner: 'Aviva', extras: 5},
];

const quotesMonthly = [
    {id: 1, logo: <Avatar1/>, price: 100.01, excess: 50, upfront: 28, owner: 'Aviva', extras: 7},
    {id: 2, logo: <Avatar1/>, price: 231.00, excess: 115, upfront: 41, owner: 'Aviva', extras: 4},
    {id: 3, logo: <Avatar2/>, price: 456.00, excess: 228, upfront: 24, owner: 'admiral', extras: 20},
    {id: 4, logo: <Avatar1/>, price: 621.10, excess: 310, upfront: 52, owner: 'Aviva', extras: 14},
];

const MotorQuotesListContent = (props: any) => {
    return <QuotesList quotes={props.type === 'monthly' ? quotesMonthly : quotesAnnual} type={props.type} />;
};

export default connect(null, null)(MotorQuotesListContent);