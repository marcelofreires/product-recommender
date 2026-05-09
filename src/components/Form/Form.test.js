import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from './Form';
import mockProducts from '../../mocks/mockProducts';

import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

jest.mock('../../hooks/useProducts');
jest.mock('../../hooks/useForm');
jest.mock('../../hooks/useRecommendations');

jest.mock('axios', () => ({
  get: jest.fn(),
}));

const mockPreferences = [
  'Integração fácil com ferramentas de e-mail',
  'Personalização de funis de vendas',
  'Automação de marketing',
  'Testes A/B para otimização de campanhas',
];

const mockFeatures = [
  'Gestão de leads e oportunidades',
  'Criação e gestão de campanhas de e-mail',
  'Gestão de conversas em diferentes canais',
  'Análise de dados para insights estratégicos',
];

const mockRecommendations = [
  { ...mockProducts[0], matchScore: 2 },
  { ...mockProducts[1], matchScore: 1 },
];

const mockOnRecommendationsUpdate = jest.fn();

describe('<Form />', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: '',
      },
      handleChange: jest.fn((key, value) => {}),
    });

    useProducts.mockReturnValue({
      preferences: mockPreferences,
      features: mockFeatures,
      products: mockProducts,
    });

    useRecommendations.mockReturnValue({
      getRecommendations: jest.fn(),
    });
  });

  test('Renderiza formulário com todas as opções iniciais', () => {
    render(<Form onRecommendationsUpdate={mockOnRecommendationsUpdate} />);

    const preferenceTitle = screen.getByRole('heading', {
      name: 'Preferências',
    });
    expect(preferenceTitle).toBeVisible();

    const featureTitle = screen.getByRole('heading', {
      name: 'Funcionalidades',
    });
    expect(featureTitle).toBeVisible();

    const radioSingleProduct = screen.getByRole('radio', {
      name: 'Produto Único',
    });
    const radioMultipleProducts = screen.getByRole('radio', {
      name: 'Múltiplos Produtos',
    });
    expect(radioSingleProduct).toBeVisible();
    expect(radioMultipleProducts).toBeVisible();

    const submitButton = screen.getByRole('button', {
      name: 'Obter recomendação',
    });
    expect(submitButton).toBeVisible();
  });

  test('Fluxo completo com múltiplas seleções (MultipleProducts)', async () => {
    const mockHandleChange = jest.fn();
    const mockGetRecommendations = jest
      .fn()
      .mockReturnValue(mockRecommendations);

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [mockPreferences[0], mockPreferences[1]],
        selectedFeatures: [mockFeatures[0], mockFeatures[1]],
        selectedRecommendationType: 'MultipleProducts',
      },
      handleChange: mockHandleChange,
    });

    useRecommendations.mockReturnValue({
      getRecommendations: mockGetRecommendations,
    });

    render(<Form onRecommendationsUpdate={mockOnRecommendationsUpdate} />);

    const preferenceCheckboxes = screen.getAllByRole('checkbox');
    await userEvent.click(preferenceCheckboxes[0]);
    await userEvent.click(preferenceCheckboxes[1]);

    await userEvent.click(preferenceCheckboxes[4]);
    await userEvent.click(preferenceCheckboxes[5]);

    const radioMultipleProducts = screen.getByRole('radio', {
      name: 'Múltiplos Produtos',
    });
    await userEvent.click(radioMultipleProducts);

    const submitButton = screen.getByRole('button', {
      name: 'Obter recomendação',
    });
    await userEvent.click(submitButton);

    expect(mockGetRecommendations).toHaveBeenCalled();

    expect(mockOnRecommendationsUpdate).toHaveBeenCalledWith(
      mockRecommendations,
    );
    expect(mockOnRecommendationsUpdate).toHaveBeenCalledTimes(1);
  });

  test('Fluxo com seleção SingleProduct', async () => {
    const mockHandleChange = jest.fn();
    const mockSingleRecommendation = [{ ...mockProducts[0], matchScore: 2 }];
    const mockGetRecommendations = jest
      .fn()
      .mockReturnValue(mockSingleRecommendation);

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [mockPreferences[0]],
        selectedFeatures: [mockFeatures[0]],
        selectedRecommendationType: 'SingleProduct',
      },
      handleChange: mockHandleChange,
    });

    useRecommendations.mockReturnValue({
      getRecommendations: mockGetRecommendations,
    });

    render(<Form onRecommendationsUpdate={mockOnRecommendationsUpdate} />);

    const preferenceCheckboxes = screen.getAllByRole('checkbox');
    await userEvent.click(preferenceCheckboxes[0]);

    await userEvent.click(preferenceCheckboxes[4]);

    const radioSingleProduct = screen.getByRole('radio', {
      name: 'Produto Único',
    });
    await userEvent.click(radioSingleProduct);

    const submitButton = screen.getByRole('button', {
      name: 'Obter recomendação',
    });
    await userEvent.click(submitButton);

    expect(mockGetRecommendations).toHaveBeenCalled();

    expect(mockOnRecommendationsUpdate).toHaveBeenCalledWith(
      mockSingleRecommendation,
    );
    expect(mockOnRecommendationsUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnRecommendationsUpdate.mock.calls[0][0]).toHaveLength(1);
  });
});
