import { StackNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';

import HomeContainer from "../../screens/Home/HomeContainer";
import PoliciesContainer from '../../screens/Policies/PoliciesContainer';
import SettingsContainer from '../../screens/Settings/SettingsContainer';
import WarrantiesContainer from '../../screens/Warranties/WarrantiesContainer';
import MotorContainer from '../../screens/Motor/MotorContainer';
import PolicyInfoContainer from '../../screens/PolicyInfo/PolicyInfoContainer';
import CarQuestionsContainer from '../../screens/CarQuestions/CarQuestionsContainer';
import MotorNewPolicyContainer from '../../screens/MotorNewPolicy/MotorNewPolicyContainer';
import ManualEntryContainer from '../../screens/ManualEntry/ManualEntryContainer';
import GettingQuotesContainer from '../../screens/GettingQuotes/GettingQuotesContainer';


export const MainNavNavigator = StackNavigator({  
    GettingQuotes: {
        screen: GettingQuotesContainer
    },
    Policies: {
        screen: PoliciesContainer
    },
    
    Home: {
        screen: HomeContainer
    },
    ManualEntry: {
        screen: ManualEntryContainer
    },
    CarQuestions: {
        screen: CarQuestionsContainer
    },
    MotorNewPolicy: {
        screen: MotorNewPolicyContainer
    },
    Motor: {
        screen: MotorContainer
    },
    PolicyInfo: {
        screen: PolicyInfoContainer
    },
    Settings: {
        screen: SettingsContainer
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

