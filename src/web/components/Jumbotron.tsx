import * as React from 'react'
import styled from 'styled-components'
import { PINK } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import { Logo } from 'src/web/images';

// language=SCSS prefix=dummy{ suffix=}
const Divider = styled.div`
  width: 25px;
  height: 4px;
  background-color: ${PINK};
  margin: ${MARGIN.large}px auto;
`

// language=SCSS prefix=dummy{ suffix=}
const TopHeadline = styled.p`
  font-size: 36px;
  font-weight: 600;
`

// language=SCSS prefix=dummy{ suffix=}
const BottomHeadline = styled.p`font-size: 16px;`

export default class Jumbotron extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <Logo scale={1.5} />
        <TopHeadline>
          your<br />
          insurance<br />
          memory<br />
        </TopHeadline>
        <Divider />
        <BottomHeadline>
          store your policies<br />
          minimise your premiums<br />
        </BottomHeadline>
      </div>
    )
  }
}
