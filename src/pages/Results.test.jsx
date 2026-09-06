import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Results from './Results';
import * as fetchHookModule from '../hooks/useFetchRecipes';

describe('Results View Component', () => {
  it('renders loading skeleton when fetching recipes', () => {
    vi.spyOn(fetchHookModule, 'default').mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/results?query=Pasta']}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('skeleton-grid')).toBeInTheDocument();
  });

  it('renders recipe grid when data is successfully fetched', () => {
    const mockMeals = {
      meals: [
        {
          idMeal: '52772',
          strMeal: 'Teriyaki Chicken Casserole',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
          strCategory: 'Chicken',
          strArea: 'Japanese',
        },
        {
          idMeal: '52773',
          strMeal: 'Honey Teriyaki Salmon',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/xxyupu1468256251.jpg',
          strCategory: 'Seafood',
          strArea: 'Japanese',
        },
      ],
    };

    vi.spyOn(fetchHookModule, 'default').mockReturnValue({
      data: mockMeals,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/results?query=Teriyaki']}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('recipe-grid')).toBeInTheDocument();
    expect(screen.getByText('Teriyaki Chicken Casserole')).toBeInTheDocument();
    expect(screen.getByText('Honey Teriyaki Salmon')).toBeInTheDocument();
    expect(screen.getByText('Found 2 recipes')).toBeInTheDocument();
  });

  it('renders empty state when no recipes match query', () => {
    vi.spyOn(fetchHookModule, 'default').mockReturnValue({
      data: { meals: null },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/results?query=NonExistentFood']}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('No recipes found')).toBeInTheDocument();
  });
});
