import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RecommendationType from './RecommendationType';

const mockOnRecommendationTypeChange = jest.fn();

describe('<RecommendationType />', () => {
  test('Exibe os tipos de recomendações para selecionar', () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />,
    );

    const radioSingleProduct = screen.getByRole('radio', {
      name: 'Produto Único',
    });
    const radioMultipleProducts = screen.getByRole('radio', {
      name: 'Múltiplos Produtos',
    });

    expect(radioSingleProduct).toBeVisible();
    expect(radioMultipleProducts).toBeVisible();
  });

  test('Dispara a função onRecommendationTypeChange quando o usuário clica no tipo de recomendação', async () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />,
    );

    const radioSingleProduct = screen.getByRole('radio', {
      name: 'Produto Único',
    });

    await userEvent.click(radioSingleProduct);

    expect(mockOnRecommendationTypeChange).toHaveBeenNthCalledWith(
      1,
      'SingleProduct',
    );
    expect(radioSingleProduct).toBeChecked();
  });

  test('Seleciona somente um tipo de recomendação', async () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />,
    );

    const radioSingleProduct = screen.getByRole('radio', {
      name: 'Produto Único',
    });
    const radioMultipleProducts = screen.getByRole('radio', {
      name: 'Múltiplos Produtos',
    });

    await userEvent.click(radioSingleProduct);

    expect(radioSingleProduct).toBeChecked();
    expect(radioMultipleProducts).not.toBeChecked();

    await userEvent.click(radioMultipleProducts);

    expect(radioSingleProduct).not.toBeChecked();
    expect(radioMultipleProducts).toBeChecked();
  });
});
