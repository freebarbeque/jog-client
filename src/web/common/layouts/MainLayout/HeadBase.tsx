import * as React from 'react';

import ArrowButton from 'src/web/components/ArrowButton';

import {
    Widget,
    WidgetArrow,
    WidgetContent,
    WidgetImage,
    WidgetPrimaryTitle,
    WidgetSecondaryTitle,
    HeadSection,
    StyledLink,
} from './styled';

class WidgetBase extends React.PureComponent<any, any> {
    render() {
        const {
            previousPageUrl,
            primaryTitle,
            secondaryTitle,
            icon,
            style,
        } = this.props;

        return (
            <HeadSection style={style}>
                <StyledLink to={previousPageUrl}>
                    <Widget>
                        <WidgetArrow>
                            <ArrowButton position="left" width={10} height={15} />
                        </WidgetArrow>
                        {icon && <WidgetImage>{icon}</WidgetImage>}
                        <WidgetContent>
                            <WidgetPrimaryTitle>{primaryTitle}</WidgetPrimaryTitle>
                            <WidgetSecondaryTitle>{secondaryTitle}</WidgetSecondaryTitle>
                        </WidgetContent>
                    </Widget>
                </StyledLink>
            </HeadSection>
        );
    }
}

export default WidgetBase;
