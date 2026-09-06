import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Layout and Routing', () => {
  it('renders Navbar brand logo and navigation links', () => {
    render(<App />);

    const flavorElements = screen.getAllByText(/Flavor/i);
    expect(flavorElements.length).toBeGreaterThan(0);

    const findElements = screen.getAllByText(/Find/i);
    expect(findElements.length).toBeGreaterThan(0);

    const homeElements = screen.getAllByText(/Home/i);
    expect(homeElements.length).toBeGreaterThan(0);

    const browseElements = screen.getAllByText(/Browse All/i);
    expect(browseElements.length).toBeGreaterThan(0);
  });

  it('renders Footer component with Moringa project specs', () => {
    render(<App />);

    expect(screen.getByText(/Moringa School Phase 1 Capstone Project/i)).toBeInTheDocument();
  });
});
