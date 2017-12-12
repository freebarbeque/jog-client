import * as React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {BLUE, PINK, DATEPICKER_BORDER, FOOTER_BACKGROUND_COLOR} from 'src/common/constants/palette';
import ArrowButton from 'src/web/components/ArrowButton';
const moment = require('moment');

interface IPolicyDatePickerProps {
  className?: string;
  value?: string;
  onChange?: any;
  placeholder: string;
  error?: string[] | undefined;
  touched?: boolean;
  maxDate?: any;
  minDate?: any;
}

interface IDateButton {
  className?: string;
  value?: string;
  onClick?: any;
  placeholder?: string;
  error?: string[] | undefined;
  touched?: boolean;
}

const DateButton: React.StatelessComponent<IDateButton> = (props) => (
  <button
    className={props.className}
    onClick={props.onClick}
    type="button"
  >
    {props.value || props.placeholder}
    {props.error && props.touched ? (<ErrorText>{props.error[0]}</ErrorText>) : null}
  </button>
);

const PolicyDatePicker: React.StatelessComponent<IPolicyDatePickerProps> = (props) => (
  <div className={props.className}>
    <DatePicker
      dateFormat="DD - MM - YYYY"
      selected={props.value || null}
      onChange={props.onChange}
      customInput={<StyledDateButton error={props.error} touched={props.touched}/>}
      popperPlacement="bottom-start"
      placeholderText={props.placeholder}
      fixedHeight
      showYearDropdown
      showMonthDropdown
      yearDropdownItemNumber={15}
      maxDate={props.maxDate}
      minDate={props.minDate}
      dropdownMode="select"
    />
  </div>
);

const StyledPolicyDatePicker = styled(PolicyDatePicker)`
  display: flex;
  width: 300px;
  
  & > div {
    display: flex;
    flex: 1 0;
    
    & > .react-datepicker-wrapper {
      display: flex;
      flex: 1 0;
      z-index: 99;
      
      & > .react-datepicker__input-container {
        display: flex;
        flex: 1 0;
      }
    }

    & .react-datepicker-popper {
      z-index: 100;
    }
    
    & .react-datepicker-popper[data-placement^="bottom"] {
      & .react-datepicker__triangle, .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
         border-bottom-color: ${BLUE};
         top: 1px;
      }
    }
        
    & .react-datepicker {
     display: flex;
     flex-direction: column;
     width: 300px;
     border: 1px solid ${DATEPICKER_BORDER};
     
     & .react-datepicker__triangle::before {
       border-top-color: #50E3C2;
     }
     
     &__day {
        color: #666B80;
        width: 2.2rem;
        line-height: 2rem;
        font-size: 0.9375rem;
        font-family: "Work-Sans", sans-serif !important;
        &--selected {
          background-color: #50E3C2 !important;
          color: #FFF;
        }
        
        &--outside-month {
          color: ${DATEPICKER_BORDER};
        }
        
        &--today {
          background-color: #D8DDE6;
          color: #FFF;
          border-radius: 0.3rem;
        }
     }
     
     & .react-datepicker__navigation  {
        &--next {
          border-left-color: #FFF;
          border-width: 0.5rem;
        }
        
        &--previous {
          border-right-color: #FFF;
          border-width: 0.5rem;
        }
      }
    }
    
    & .react-datepicker__header {
      background-color: #50E3C2; 
      border-bottom: 1px solid ${DATEPICKER_BORDER};
      & .react-datepicker__current-month {
        color: #FFF;
        font-size: 1.1rem;
        border-width: 0.45rem;
        margin-bottom: 5px;
      }
      
      & .react-datepicker__day-name {
        color: #FFF;
        width: 2.2rem;
        height: 1.6rem;
        font-size: 1rem;
      }
    }  
  }
`;

const StyledDateButton = styled(DateButton)`
  border: 2px solid ${props => props.error && props.touched ? PINK : '#D9DEE3'};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.value ? '#666B80' : '#D0CED2'};
  outline: 0;
  padding: 0;
  flex: 0 0 300px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  
  &:disabled {
    cursor: default;
    color: #D0CED2;
  }
`;

const ErrorText = styled.div`
  color: ${PINK};
  font-size: 11px;
  line-height: 13px;
  position: absolute;
  right: 0;
  bottom: -15px;
`;

export default StyledPolicyDatePicker;