// @flow

import React from 'react';
import MyComponent from './MyComponent';

function App() {
  const personData = {
    name: 'John Doe',
    age: 25,
  };

  return (
      <div>
        <h1>My App</h1>
        <MyComponent name={personData.name} age={personData.age} />
      </div>
  );
}

export default App;
