import * as React from 'react';
import styled, {StyledFunction, ThemedStyledFunction} from 'styled-components';

export function styledComponentWithProps<T, U extends HTMLElement = HTMLElement>(styledFunction: StyledFunction<React.HTMLProps<U>>): StyledFunction<T & React.HTMLProps<U>> {
  return styledFunction
}