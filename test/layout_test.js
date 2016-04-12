import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';

import Layout from '../app/containers/Layout';
import {expect} from 'chai';


describe('Layout component', () => {
  "use strict";

  const layoutComponent = renderIntoDocument(<Layout/>);

  it('has a title', () => {
    const h1 = findRenderedDOMComponentWithTag(layoutComponent, 'h1');
    expect(h1.textContent).to.equal('Nagyi bevásárló listája');
  });


})
