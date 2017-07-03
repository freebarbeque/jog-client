import styled from 'styled-components'
import { max, min } from '../media'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  height: 100%;
  position: relative;

  ${max.smallTablet`
    flex: 1;
    display: flex;
    flex-direction: column;
  `} ${min.smallTablet`
    margin-left: 40px;
    margin-right: 40px;
  `} ${min.mediumDesktop`
    margin-left: 80px;
    margin-right: 80px;
  `} ${min.largeDesktop`
    margin-left: 200px;
    margin-right: 200px;
  `} ${min.verylargeDesktop`
    margin-left: 250px;
    margin-right: 250px;
  `} ${min.hugeDesktop`
    margin-left: 300px;
    margin-right: 300px;
  `};
`

export default Container
