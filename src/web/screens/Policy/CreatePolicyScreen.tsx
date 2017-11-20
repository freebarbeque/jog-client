import * as React from 'react';
import Header from 'src/web/components/Header';
import Description from './components/Description';

interface ICreatePolicyScreenProps {
    className: string;
}

export default (props: ICreatePolicyScreenProps) => (
    <div className={props.className}>
        <Header />
        <Description />
    </div>
);