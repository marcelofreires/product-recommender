import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Preferences from './Preferences';

const mockPreferences = [
  'Relatórios avançados de desempenho de vendas',
  'Personalização de funis de vendas',
  'Automação de marketing',
  'Testes A/B para otimização de campanhas',
  'Histórico unificado de interações',
  'Integração com chatbots',
  'Análise preditiva de dados',
  'Recomendações personalizadas para usuários',
];

const mockOnPreferenceChange = jest.fn();

const createComponent = ({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) => {
  render(
    <Preferences
      preferences={preferences}
      selectedPreferences={selectedPreferences}
      onPreferenceChange={onPreferenceChange}
    />,
  );
};

describe('<Preferences />', () => {
  test('Exibe lista de preferências para seleção', () => {
    createComponent({
      preferences: mockPreferences,
      onPreferenceChange: mockOnPreferenceChange,
    });

    const listTitle = screen.getByRole('heading', {
      name: 'Preferências',
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

  test('Chama onPreferenceChange ao clicar em um checkbox', async () => {
    createComponent({
      preferences: mockPreferences,
      onPreferenceChange: mockOnPreferenceChange,
    });

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    expect(mockOnPreferenceChange).toHaveBeenCalledTimes(1);
    expect(mockOnPreferenceChange).toHaveBeenCalledWith([mockPreferences[0]]);
    expect(checkboxes[0]).toBeChecked();
  });

  test('Chama onPreferenceChange com múltiplas preferências ao clicar em vários checkboxes', async () => {
    createComponent({
      preferences: mockPreferences,
      onPreferenceChange: mockOnPreferenceChange,
    });

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[1]);

    expect(mockOnPreferenceChange).toHaveBeenCalledTimes(2);
    expect(mockOnPreferenceChange).toHaveBeenNthCalledWith(1, [
      mockPreferences[0],
    ]);
    expect(mockOnPreferenceChange).toHaveBeenNthCalledWith(2, [
      mockPreferences[0],
      mockPreferences[1],
    ]);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  test('Remove preferências ao desmarcar checkbox', async () => {
    createComponent({
      preferences: mockPreferences,
      selectedPreferences: [mockPreferences[0]],
      onPreferenceChange: mockOnPreferenceChange,
    });

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    expect(mockOnPreferenceChange).toHaveBeenCalledTimes(1);
    expect(mockOnPreferenceChange).toHaveBeenCalledWith([]);
    expect(checkboxes[1]).not.toBeChecked();
  });
});
