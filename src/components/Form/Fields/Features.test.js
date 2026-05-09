import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Features from './Features';

const mockFeatures = [
  'Gestão de leads e oportunidades',
  'Rastreamento de interações com clientes',
  'Criação e gestão de campanhas de e-mail',
  'Rastreamento de comportamento do usuário',
  'Gestão de conversas em diferentes canais',
  'Chat ao vivo e mensagens automatizadas',
  'Análise de dados para insights estratégicos',
  'Recomendação de ações com base em padrões',
];

const mockOnFeatureChange = jest.fn();

const createComponent = ({
  features,
  selectedFeatures = [],
  onFeatureChange,
}) => {
  render(
    <Features
      features={features}
      selectedFeatures={selectedFeatures}
      onFeatureChange={onFeatureChange}
    />,
  );
};

describe('<Features />', () => {
  test('Exibe lista de funcionalidades para seleção', () => {
    createComponent({
      features: mockFeatures,
      onFeatureChange: mockOnFeatureChange,
    });

    const listTitle = screen.getByRole('heading', {
      name: 'Funcionalidades',
    });
    const listElement = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');

    expect(listTitle).toBeVisible();
    expect(listElement).toBeVisible();
    expect(listItems).toHaveLength(8);
    listItems.forEach((item) => {
      expect(item).toBeVisible();
    });
  });

  test('Chama onFeatureChange ao clicar em um checkbox', async () => {
    createComponent({
      features: mockFeatures,
      onFeatureChange: mockOnFeatureChange,
    });

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    expect(mockOnFeatureChange).toHaveBeenCalledTimes(1);
    expect(mockOnFeatureChange).toHaveBeenCalledWith([mockFeatures[0]]);
    expect(checkboxes[0]).toBeChecked();
  });

  test('Chama onFeatureChange com múltiplas funcionalidades ao clicar em vários checkboxes', async () => {
    createComponent({
      features: mockFeatures,
      onFeatureChange: mockOnFeatureChange,
    });

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[1]);

    expect(mockOnFeatureChange).toHaveBeenCalledTimes(2);
    expect(mockOnFeatureChange).toHaveBeenNthCalledWith(1, [mockFeatures[0]]);
    expect(mockOnFeatureChange).toHaveBeenNthCalledWith(2, [
      mockFeatures[0],
      mockFeatures[1],
    ]);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  test('Remove funcionalidade ao desmarcar checkbox', async () => {
    createComponent({
      features: mockFeatures,
      selectedFeatures: [mockFeatures[0]],
      onFeatureChange: mockOnFeatureChange,
    });

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    expect(mockOnFeatureChange).toHaveBeenCalledTimes(1);
    expect(mockOnFeatureChange).toHaveBeenCalledWith([]);
    expect(checkboxes[1]).not.toBeChecked();
  });
});
