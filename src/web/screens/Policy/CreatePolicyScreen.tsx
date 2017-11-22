import * as React from 'react';
import Header from 'src/web/components/Header';
import Description from './components/Description';
import styled from 'styled-components';
import {CREAM, WHITE} from '~/common/constants/palette';
import Footer from 'src/web/components/Footer';
import CreatePolicyForm from './components/CreatePolicyForm';
import {ICreatePolicyFormValues} from '~/common/interfaces/policies';

interface ICreatePolicyScreenProps {
    className: string;
}

const Content = styled.div`
    background-color: ${CREAM};
    padding: 35px 25px;
    display: flex;
`;

const ContentContainer = styled.div`
    color: #000;
    box-shadow: 0 2px 4px #333;
    background-color: ${WHITE};
`

const Left = ContentContainer.extend`
    width: 70%;
    margin-right: 10px;
`;

const Right = ContentContainer.extend`
    width: calc(30% - 10px);
`;

export default (props: ICreatePolicyScreenProps) => (
    <div className={props.className}>
        <Header/>
        <Description/>
        <Content>
            <Left>
                <CreatePolicyForm onSubmit={(values: ICreatePolicyFormValues) => console.log(values)}/>
            </Left>
        </Content>
        <Footer/>
    </div>
);