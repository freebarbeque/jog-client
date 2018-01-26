import * as React from 'react';
import { connect } from 'react-redux';

import {getInsuranceCompanies} from 'src/common/selectors/dataSource';
import {Clock, CompanyLogoDefault} from 'src/web/images';
import PolicyStatuses from 'src/web/model/PolicyStatuses';

import PolicyButtonBase from './PolicyButtonBase';

class PolicyButton extends React.PureComponent<any, any> {
    renderIcon = () => {
      const { policy } = this.props;

      if (policy.status === PolicyStatuses.Pending) {
          return <Clock width={70} height={70} />;
      }

      const insuranceCompanyLogoUrl = this.getInsuranceCompanyLogoUrl(policy.insurance_company_id);

      if (insuranceCompanyLogoUrl) {
          return <img src={insuranceCompanyLogoUrl} width={'100%'} height={'100%'} />;
      }

      return <CompanyLogoDefault width={45} height={45} />;
    };

    getInsuranceCompanyLogoUrl = companyId => {
        const company = this.props.insuranceCompanies.find(company => company.id === companyId);
        return company && company.image && company.image.url;
    };

    handleClick = event => {
      const { policy } = this.props;

      if (policy.status === PolicyStatuses.Pending) {
          event.preventDefault();
      }
    };

    render() {
        const {
            policy,
            secondaryTitle,
            roundedIcon,
            iconBackgroundColor,
            url,
        } = this.props;

        return (
            <PolicyButtonBase
                primaryTitle={policy.status === PolicyStatuses.Pending ? 'New Policy' : `Policy ${policy.policy_number}`}
                secondaryTitle={secondaryTitle}
                statusText={policy.status === PolicyStatuses.Pending ? 'Document processing in progress' : 'Add more details to complete this policy'}
                disabled={policy.status === PolicyStatuses.Pending}
                roundedIcon={roundedIcon}
                iconBackgroundColor={iconBackgroundColor}
                url={url}
                icon={this.renderIcon()}
                onButtonClick={this.handleClick}
            />
        )
    }
}

const mapStateToProps = (state: any) => ({
    insuranceCompanies: getInsuranceCompanies(state) || [],
});

export default connect(mapStateToProps)(PolicyButton) as any;
