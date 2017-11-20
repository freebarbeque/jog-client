import * as React from 'react';
import Header from 'src/web/components/Header';

interface ICreatePolicyScreenProps {
    className: string;
}

export default (props: ICreatePolicyScreenProps) => (
    <div className={props.className}>
        <Header />
    </div>
);