import React from 'react';
import ReactDOM from 'react-dom';
import Commits from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Commits />, div);
  ReactDOM.unmountComponentAtNode(div);
});
