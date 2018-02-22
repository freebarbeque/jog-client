import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

import { Cross, Logo } from 'src/web/images';

import * as s from './assets/AuthLayout.styled';

export default function({ children, title, fluid }: any) {
    return (
        <s.Root>
            <s.Header>
                <Link to="/"><Logo /></Link>
                <Link to="/auth"><FlatButton icon={<Cross />} /></Link>
            </s.Header>
            <s.Content>
                <s.Container fluid={fluid}>
                    {title && <s.Title>{title}</s.Title>}
                    {children}
                </s.Container>
            </s.Content>
        </s.Root>
    );
}
