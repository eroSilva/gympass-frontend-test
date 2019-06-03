import React from 'react';
import ReactDOM from 'react-dom';
import Repository from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Repository repositoryData={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
