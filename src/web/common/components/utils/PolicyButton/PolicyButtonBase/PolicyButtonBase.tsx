import * as React from 'react';

import { BlackArrow } from 'src/web/images';
import * as S from './PolicyButtonBase.styled'
import { IPolicyButtonBaseProps } from './interface';

class PolicyButtonBase extends React.PureComponent<IPolicyButtonBaseProps, any> {
    render() {
        const {
            primaryTitle,
            secondaryTitle,
            statusText,
            roundedIcon,
            iconBackgroundColor,
            icon,
            url,
            onButtonClick,
        } = this.props;

        return (
            <S.PolicyLink to={url} onClick={onButtonClick}>
                <S.Aside>
                    <S.Image bgColor={iconBackgroundColor} rounded={roundedIcon}>
                        {icon}
                    </S.Image>
                </S.Aside>
                <S.Content>
                    <S.Title>
                        <S.PrimaryTitle>{primaryTitle}</S.PrimaryTitle>
                        <S.SecondaryTitle>{secondaryTitle}</S.SecondaryTitle>
                        <S.StatusText>{statusText}</S.StatusText>
                    </S.Title>
                    <S.Arrow>
                        <BlackArrow />
                    </S.Arrow>
                </S.Content>
            </S.PolicyLink>
        )
    }
}

export default PolicyButtonBase;
