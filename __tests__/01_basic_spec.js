import React, { useReducer, StrictMode } from 'react';

import { render, fireEvent, cleanup } from '@testing-library/react';

import {
  Provider,
  useTracked,
} from '../src/index';

describe('basic spec', () => {
  afterEach(cleanup);

  it('hooks are defiend', () => {
    expect(useTracked).toBeDefined();
  });

  it('create a component', () => {
    const initialState = {
      count1: 0,
    };
    const reducer = (state = initialState, action) => {
      if (action.type === 'increment') {
        return { ...state, count1: state.count1 + 1 };
      }
      return state;
    };
    const useValue = () => useReducer(reducer, initialState);
    const Counter = () => {
      const [state, dispatch] = useTracked();
      return (
        <div>
          <span>{state.count1}</span>
          <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
        </div>
      );
    };
    const App = () => (
      <StrictMode>
        <Provider useValue={useValue}>
          <Counter />
          <Counter />
        </Provider>
      </StrictMode>
    );
    const { getAllByText, container } = render(<App />);
    expect(container).toMatchSnapshot();
    fireEvent.click(getAllByText('+1')[0]);
    expect(container).toMatchSnapshot();
  });
});
