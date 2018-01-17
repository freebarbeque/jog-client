import * as React from 'react';

import HeadBase from './HeadBase';

import { PlusIcon } from './styled';

class NewPolicyWidget extends React.PureComponent<any, any> {
    render() {
        const { previousPageUrl } = this.props;

        return (
            <HeadBase
                previousPageUrl={previousPageUrl}
                primaryTitle="New Policy"
                secondaryTitle="Lets get you set up"
                icon={<PlusIcon>+</PlusIcon>}
                style={{ height: 110 }}
            />
        )
    }
}

export default NewPolicyWidget;
