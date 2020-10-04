import React from 'react';
import { render, cleanup, getAllByTestId } from '@testing-library/react';
// import { ps07, vi01, ships } from './__mocks__/@fleetSpy/transmarine.mjs';
import ShipTable from '../components/ShipTable/ShipTable';
import { Provider } from 'react-redux';
import reducer from '../reducer';
import { createStore } from 'redux';
const store = createStore(reducer);

afterEach(cleanup);
describe('ShipTable', () => {
  let table: HTMLElement;
  let ownerHeader: HTMLElement;
  beforeEach(() => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ShipTable setRows={() => {}} />
      </Provider>,
    );
    table = getByTestId('table-body');
    ownerHeader = getByTestId('header-Owner');
  });
  it('should have an owner header', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(ownerHeader.textContent).toMatch('Owner');
  });
  it('should initially have 23 entries', () => {
    expect(table.children.length).toBe(23);
  });
});
