import * as React from 'react';
import styled from 'styled-components';
import { PolicyBots, Details, Upload } from 'src/web/images';
import Benefit from './Benefit';

const BenefitsSection = (props: any) => (
    <div className={props.className}>
        <Benefit
            icon={<Upload width={140} height={150} />}
            title="Get Started"
            titleSolution="easy to upload your policies"
            description="Secure your details to our online lockbox"
        />
        <Benefit
            icon={<Details width={140} height={120} />}
            title="Always Available"
            titleSolution="your details always at hand"
            description="A touch away when and where you need them"
        />
        <Benefit
            icon={<PolicyBots width={140} height={100} />}
            title="Always Searching"
            titleSolution="get instant quotes"
            description="Our policy bots will be hard at work checking your cover optimisation every day"
        />
    </div>
);

const StyledBenefitsSection = styled(BenefitsSection)`
  align-self: stretch;
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  flex-shrink: 0;
`;

export default StyledBenefitsSection;
