import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Home from './Home';

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Home View Component', () => {
  it('renders hero title and controlled search bar input', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/Find Your Next Favorite/i)).toBeInTheDocument();
    
    const searchInput = screen.getByLabelText(/Search recipes/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('');
  });

  it('updates input state as user types and navigates on submit', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const searchInput = screen.getByLabelText(/Search recipes/i);
    const searchForm = screen.getByRole('search', { name: /Recipe Search Form/i });

    // Simulate user typing
    fireEvent.change(searchInput, { target: { value: 'Pasta' } });
    expect(searchInput.value).toBe('Pasta');

    // Simulate form submission
    fireEvent.submit(searchForm);

    expect(mockNavigate).toHaveBeenCalledWith('/results?query=Pasta');
  });
});
