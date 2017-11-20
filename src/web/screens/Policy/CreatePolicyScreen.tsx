import * as React from 'react';
import Header from 'src/web/components/Header';
import Description from './components/Description';
import styled from 'styled-components';
import {CREAM} from '~/common/constants/palette';
import Footer from 'src/web/components/Footer';

interface ICreatePolicyScreenProps {
    className: string;
}

const Content = styled.div`
  background-color: ${CREAM};
`;

export default (props: ICreatePolicyScreenProps) => (
    <div className={props.className}>
        <Header />
        <Description />
        <Content>111</Content>
        <Footer />
    </div>
);