import * as React from 'react';
import { withRouter } from 'react-router';

import MainLayout from 'src/web/common/layouts/MainLayout';
import Section from 'src/web/common/components/Section';

class MotorPolicyCreationManual extends React.PureComponent<any, any> {
    render() {
        return (
            <MainLayout headComponent={MainLayout.NewPolicyHead} previousPageUrl="/">
                <div style={{ width: '70%', margin: '0 auto' }}>
                    <Section>
                        <h1>MotorPolicyCreationManual</h1>
                    </Section>
                </div>
            </MainLayout>
        )
    }
}

export default withRouter(MotorPolicyCreationManual);
