import { render, screen } from '@testing-library/react';

import RecommendationList from './RecommendationList';
import mockProducts from '../../mocks/mockProducts';

const EMPTY_LIST_RECOMMENDATIONS = [];
const EMPTY_LIST_RECOMMENDATIONS_MESSAGE = 'Nenhuma recomendação encontrada.';

describe('<RecommendationList />', () => {
  test('Exibe a lista vazia com o título e a mensagem de lista vazia quando não houver recomendações', () => {
    render(<RecommendationList recommendations={EMPTY_LIST_RECOMMENDATIONS} />);

    const listTitle = screen.getByRole('heading', {
      name: 'Lista de Recomendações',
    });
    const emptyListMessage = screen.getByText(
      EMPTY_LIST_RECOMMENDATIONS_MESSAGE,
    );
    const listElement = screen.queryByRole('list');

    expect(listTitle).toBeVisible();
    expect(listElement).toBe(null);
    expect(emptyListMessage).toBeVisible();
  });

  test('Exibe a lista de recomendações de produtos', () => {
    render(<RecommendationList recommendations={mockProducts} />);

    const listElement = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    const emptyListMessage = screen.queryByText(
      EMPTY_LIST_RECOMMENDATIONS_MESSAGE,
    );

    expect(listElement).toBeVisible();
    expect(emptyListMessage).toBe(null);
    expect(listItems).toHaveLength(4);
    listItems.forEach((item) => {
      expect(item).toBeVisible();
    });
  });
});
