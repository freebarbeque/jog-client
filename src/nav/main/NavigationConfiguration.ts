import { StackNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';

import HomeContainer from "../../screens/Home/HomeContainer";
import PoliciesContainer from '../../screens/Policies/PoliciesContainer';
import SettingsContainer from '../../screens/Settings/SettingsContainer';
import WarrantiesContainer from '../../screens/Warranties/WarrantiesContainer';
import MotorContainer from '../../screens/Motor/MotorContainer';
import PolicyInfoContainer from '../../screens/PolicyInfo/PolicyInfoContainer';


export const MainNavNavigator = StackNavigator({   
    Home: {
        screen: HomeContainer
    },
    PolicyInfo: {
        screen: PolicyInfoContainer
    },
    Motor: {
        screen: MotorContainer
    },
    Settings: {
        screen: SettingsContainer
    },
    Policies: {
        screen: PoliciesContainer
    },
    Warranties: {
        screen: WarrantiesContainer
    },
    
},{
    headerMode:'none',
    transitionConfig : () => ({
        transitionSpec: {
            duration: 0,
            timing: Animated.timing,
            easing: Easing.step0,
        },
    }),
});

