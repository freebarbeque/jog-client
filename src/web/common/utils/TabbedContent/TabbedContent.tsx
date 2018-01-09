import * as React from 'react';

import { Link, withRouter, Switch, Route } from 'react-router-dom';

import Tabs from './Tabs';

class TabbedContent extends React.PureComponent<any, any> {
    getBaseUrl = () => this.props.match.url;
    getBasePath = () => this.props.match.path;
    getLocation = () => this.props.location.pathname;

    render() {
        const { tabsDescription } = this.props;

        return (
            <div>
                <Tabs tabs={tabsDescription} baseLocation={this.getBaseUrl()} currentLocation={this.getLocation()} />
                <Switch>
                    {tabsDescription.map(tab => {
                        const { component: TabComponent, id, type } = tab;

                        return (
                            <Route
                                key={id}
                                path={`${this.getBasePath()}/${id}`}
                                render={(props) => <TabComponent {...props} type={type} />}
                            />
                        )
                    })}
                </Switch>
            </div>
        )
    }
}

export default withRouter(TabbedContent);
