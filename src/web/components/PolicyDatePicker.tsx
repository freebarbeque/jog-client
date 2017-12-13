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
      scrollableYearDropdown
      maxDate={props.maxDate}
      minDate={props.minDate}
      yearDropdownItemNumber={100}
      dropdownMode="scroll"
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
         border-bottom-color: #000;
         top: 1px;
      }
    }
        
    & .react-datepicker {
      display: flex;
      flex-direction: column;
      width: 300px;
      border: 1px solid #000;
     
      & .react-datepicker__triangle::before {
        border-top-color: #666B80;
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
     
      & .react-datepicker__navigation {
        &--next {
          border-left-color: #666B80;
          border-width: 0.5rem;
        }
        
        &--previous {
          border-right-color: #666B80;
          border-width: 0.5rem;
        }
      }
    }
    
    & .react-datepicker__header {
      background-color: #FFF; 
      color: #666B80; 
      font-family: "Work-Sans", sans-serif !important;
      border-bottom: 1px solid #000;//${DATEPICKER_BORDER};
      & .react-datepicker__current-month {
        color: #666B80;
        font-size: 1.1rem;
        border-width: 0.45rem;
        margin-bottom: 5px;
      }
      
      & .react-datepicker__day-name {
        color: #666B80;
        width: 2.2rem;
        height: 1.6rem;
        font-size: 1rem;
      }
    }  
    
    & .react-datepicker__month-select, 
      .react-datepicker__year-select {
      outline: none;
      height: 20px;
      font-size: 14px;
      margin: 0 10px;
      background: #FFF;
      border-radius: 0;
      border: none;
      cursor: pointer;
    }
  
    & .react-datepicker__header__dropdown {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    & .react-datepicker__month-dropdown {
      position: absolute;
      background: #FFF;
      width: 122px;
      top: 0px;
      left: -10px;
      & > div {
        &: hover {
          background: #0396EF;
          color: #FFF;
        }
      }
    }

    & .react-datepicker__year-dropdown {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 255px;
      overflow-Y: scroll;
      background: #FFF;
      width: 100px;
      & > div {
        &: hover {
          background: #0396EF;
          color: #FFF;
        }
      }
    }
    
    & .react-datepicker__month-read-view, 
      .react-datepicker__year-read-view {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      height: 20px;
      font-size: 16px;
      border-width: 0.5px;
      border-color: #666B80;
      border-radius: 5px;
      &: hover {
        & .react-datepicker__month-read-view--down-arrow, 
          .react-datepicker__year-read-view--down-arrow {
          border-top-color: #000;
        }
      }
    }
    
    & .react-datepicker__month-read-view {
      width: 120px;
    }
  
    & .react-datepicker__year-read-view {
      width: 80px;
    }
    
    & .react-datepicker__year-read-view--selected-year,
      .react-datepicker__year-read-view--selected-month, {
      margin-left: 15px;
    }
    
    & .react-datepicker__month-read-view--down-arrow,
      .react-datepicker__year-read-view--down-arrow {
      position: absolute;
      border-top-color: #666B80;
      top: 8px;
      left: -13px;
      border-width: 0.3rem;
    }
    
    & .react-datepicker__month-dropdown-container,
      .react-datepicker__year-dropdown-container {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
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