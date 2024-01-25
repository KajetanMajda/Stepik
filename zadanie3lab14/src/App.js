import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ stringValue, numberValue, boolValue, arrayValue, objectValue, funcValue }) => {
  return (
      <div>
        <p>String: {stringValue}</p>
        <p>Number: {numberValue}</p>
        <p>Boolean: {boolValue ? 'True' : 'False'}</p>
        <p>Array: {JSON.stringify(arrayValue)}</p>
        <p>Object: {JSON.stringify(objectValue)}</p>
        <p>Function: {funcValue()}</p>
      </div>
  );
};

MyComponent.propTypes = {
  stringValue: PropTypes.string.isRequired,
  numberValue: PropTypes.number.isRequired,
  boolValue: PropTypes.bool.isRequired,
  arrayValue: PropTypes.array.isRequired,
  objectValue: PropTypes.object.isRequired,
  funcValue: PropTypes.func.isRequired,
};

const App = () => {
  const myFunction = () => 'Hello from function';

  return (
      <div>
        <h1>My App</h1>
        <MyComponent
            stringValue="Hello"
            numberValue={42}
            boolValue={true}
            arrayValue={[1, 2, 3]}
            objectValue={{ key: 'value' }}
            funcValue={myFunction}
        />
      </div>
  );
};

export default App;
