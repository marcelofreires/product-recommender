import { act, renderHook } from '@testing-library/react';

import useRecommendations from './useRecommendations';
import mockProducts from '../mocks/mockProducts';
import recommendationService from '../services/recommendation.service';

jest.mock('../services/recommendation.service');

describe('useForm', () => {
  test('Retorna a uma lista de recomendações vazia se não houver atualização', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts));

    expect(result.current.recommendations).toEqual([]);
  });

  test('Retorna produtos recomendados quando getRecommendations é chamado o formData', () => {
    const mockRecommendedProducts = [
      { ...mockProducts[0], matchScore: 1 },
      { ...mockProducts[1], matchScore: 1 },
    ];
    const formData = {
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      selectedFeatures: ['Criação e gestão de campanhas de e-mail'],
      selectedRecommendationType: 'Multiple',
    };

    recommendationService.getRecommendations.mockReturnValue(
      mockRecommendedProducts,
    );

    const { result } = renderHook(() => useRecommendations(mockProducts));

    act(() => {
      result.current.getRecommendations(formData);
    });

    expect(result.current.recommendations).toEqual(mockRecommendedProducts);
    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
      formData,
      mockProducts,
    );
  });
});
