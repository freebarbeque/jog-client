import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {withRouter} from 'react-router-dom';

import QuotesListItem from './QuotesListItem';
import {BlackArrow} from 'src/web/images';

const QuotesList = (props: any) => {
    const getQuoteAbsolutePath = quote => {
        const baseLocationWithoutType = props.match.url.split('/').slice(0, -1).join('/');
        return `${baseLocationWithoutType}/quote/${quote.id}/${props.type}`;
    };

    return (
        <Container>
            <Context>
                <Sort>Sort by <StyledBlackArrow height={10} width={10}/></Sort>
                <QuotesWrapper>
                    {props.quotes.map((item, index) => (
                        <div key={index} onClick={() => props.push(getQuoteAbsolutePath(item))}>
                            <QuotesListItem quote={item} />
                        </div>
                    ))}
                </QuotesWrapper>
                <See><Text>See more</Text><BlackArrow height={10} width={10}/></See>
            </Context>
        </Container>
    );
};

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

const Container = styled.div`
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

export default withRouter(connect(null, mapDispatchToProps)(QuotesList)) as any;