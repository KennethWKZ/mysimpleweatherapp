import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass,
    findRenderedDOMComponentWithClass
} from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import Weather from 'Weather';

describe('Weather', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Weather/>,  div);
    });
});