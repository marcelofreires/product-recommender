import { renderHook, waitFor } from '@testing-library/react';

import useProducts from './useProducts';
import mockProducts from '../mocks/mockProducts';
import getProducts from '../services/product.service';

jest.mock('../services/product.service');

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Carrega produtos e extrai preferências e features', async () => {
    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products.length).toBeGreaterThan(0);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.preferences.length).toBeGreaterThan(0);
    expect(result.current.features.length).toBeGreaterThan(0);
    expect(getProducts).toHaveBeenCalled();
  });

  test('Trata erro ao buscar produtos', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const mockError = new Error('Erro na requisição');
    getProducts.mockRejectedValue(mockError);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Erro ao obter os produtos:',
        mockError,
      );
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);

    consoleErrorSpy.mockRestore();
  });
});
