import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import RecipeCard from './RecipeCard';

const mockRecipe = {
  idMeal: '52772',
  strMeal: 'Teriyaki Chicken Casserole',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
  strCategory: 'Chicken',
  strArea: 'Japanese',
};

describe('RecipeCard Component', () => {
  it('renders recipe title, category, area, and link', () => {
    render(
      <BrowserRouter>
        <RecipeCard recipe={mockRecipe} />
      </BrowserRouter>
    );

    expect(screen.getByText('Teriyaki Chicken Casserole')).toBeInTheDocument();
    expect(screen.getByText('Chicken')).toBeInTheDocument();
    expect(screen.getByText('Japanese')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /View recipe for Teriyaki Chicken Casserole/i });
    expect(link).toHaveAttribute('href', '/recipe/52772');
  });

  it('renders null when recipe prop is missing', () => {
    const { container } = render(
      <BrowserRouter>
        <RecipeCard recipe={null} />
      </BrowserRouter>
    );

    expect(container.firstChild).toBeNull();
  });
});
