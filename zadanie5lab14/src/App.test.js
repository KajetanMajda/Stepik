// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });

  it('renders the header with the correct text', () => {
    render(<App />);
    expect(screen.getByText('Edit src/App.js and save to reload.')).toBeInTheDocument();
  });

  it('renders the "Learn React" link with the correct href', () => {
    render(<App />);
    const learnReactLink = screen.getByText('Learn React');
    expect(learnReactLink).toBeInTheDocument();
    expect(learnReactLink).toHaveAttribute('href', 'https://reactjs.org');
  });

  it('displays the logo', () => {
    render(<App />);
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', './logo.svg');
  });
});
