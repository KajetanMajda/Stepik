// @flow

import React, { Component } from 'react';

type Props = {
    name: string,
    age: number,
};

class MyComponent extends Component<Props> {
    render() {
        const { name, age } = this.props;

        return (
            <div>
                <p>Name: {name}</p>
                <p>Age: {age}</p>
            </div>
        );
    }
}

export default MyComponent;
