import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import RecipeDetail from './RecipeDetail';
import * as fetchHookModule from '../hooks/useFetchRecipes';

describe('RecipeDetail View Component', () => {
  it('renders loading skeleton when recipe detail is loading', () => {
    vi.spyOn(fetchHookModule, 'default').mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/recipe/52772']}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('detail-skeleton')).toBeInTheDocument();
  });

  it('renders full recipe details when data is loaded successfully', () => {
    const mockDetail = {
      meals: [
        {
          idMeal: '52772',
          strMeal: 'Teriyaki Chicken Casserole',
          strCategory: 'Chicken',
          strArea: 'Japanese',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
          strInstructions: 'Preheat oven to 350F. Cook chicken until tender. Mix with teriyaki sauce.',
          strIngredient1: 'Chicken',
          strMeasure1: '3/4 cup',
          strIngredient2: 'Teriyaki Sauce',
          strMeasure2: '1/2 cup',
        },
      ],
    };

    vi.spyOn(fetchHookModule, 'default').mockReturnValue({
      data: mockDetail,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/recipe/52772']}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Teriyaki Chicken Casserole')).toBeInTheDocument();
    expect(screen.getByText('Japanese Cuisine')).toBeInTheDocument();

    const chickenElements = screen.getAllByText('Chicken');
    expect(chickenElements.length).toBeGreaterThan(0);

    expect(screen.getByText('3/4 cup')).toBeInTheDocument();
    expect(screen.getByText('Teriyaki Sauce')).toBeInTheDocument();
    expect(screen.getByText(/Preheat oven to 350F/i)).toBeInTheDocument();
  });

  it('filters out null, none, and empty string ingredients gracefully', () => {
    const mockDetailWithNulls = {
      meals: [
        {
          idMeal: '52772',
          strMeal: 'Cleaned Recipe',
          strCategory: 'Chicken',
          strArea: 'Japanese',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
          strInstructions: 'Cook well.',
          strIngredient1: 'Valid Ingredient',
          strMeasure1: '1 cup',
          strIngredient2: 'null',
          strMeasure2: '1 tsp',
          strIngredient3: 'None',
          strMeasure3: '',
          strIngredient4: '   ',
          strMeasure4: '2 tbsp',
        },
      ],
    };

    vi.spyOn(fetchHookModule, 'default').mockReturnValue({
      data: mockDetailWithNulls,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/recipe/52772']}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Valid Ingredient')).toBeInTheDocument();
    expect(screen.queryByText('null')).not.toBeInTheDocument();
    expect(screen.queryByText('None')).not.toBeInTheDocument();
  });

  it('renders error message when recipe fetch fails', () => {
    vi.spyOn(fetchHookModule, 'default').mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Network connection error',
    });

    render(
      <MemoryRouter initialEntries={['/recipe/99999']}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Error Loading Recipe')).toBeInTheDocument();
    expect(screen.getByText('Network connection error')).toBeInTheDocument();
  });
});
