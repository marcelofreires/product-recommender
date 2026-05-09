import { act, renderHook } from '@testing-library/react';

import useForm from './useForm';

describe('useForm', () => {
  test('Retorna o estado inicial pelo formData se não houver atualização', () => {
    const { result } = renderHook(() =>
      useForm({
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: '',
      }),
    );

    expect(result.current.formData).toEqual({
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    });
  });

  test('Retorna o estado atualizado', () => {
    const { result } = renderHook(() =>
      useForm({
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: '',
      }),
    );

    act(() => {
      result.current.handleChange('selectedPreferences', [
        'Personalização de funis de vendas',
      ]);
    });

    expect(result.current.formData).toEqual({
      selectedPreferences: ['Personalização de funis de vendas'],
      selectedFeatures: [],
      selectedRecommendationType: '',
    });
  });
});
