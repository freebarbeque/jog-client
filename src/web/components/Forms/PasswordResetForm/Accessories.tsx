import * as React from 'react';
import { DARK_GRAY } from 'src/common/constants/palette';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const accessoryStyle = { fontWeight: 500, fontSize: 11, color: DARK_GRAY }

export default () => (
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: -20 }}>
        <FlatButton
            style={accessoryStyle as any}
            containerElement={<Link to="/auth/login" />}
        >
            KNOW YOUR PASSWORD?
        </FlatButton>
    </div>
)