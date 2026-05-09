import axios from 'axios';
import mockProducts from '../mocks/mockProducts';
import getProducts from './product.service';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('productService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('Retorna lista de produtos quando a requisição é feita com sucesso', async () => {
    axios.get.mockResolvedValue({ data: mockProducts });

    const result = await getProducts();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
    expect(result).toEqual(mockProducts);
  });

  test('Trata o erro quando a requisição falha', async () => {
    const mockError = new Error('Erro na requisição');

    axios.get.mockRejectedValue(mockError);

    await expect(getProducts()).rejects.toThrow('Erro na requisição');

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
  });

  test('Deve chamar console.error quando ocorrer erro na requisição', async () => {
    const mockError = new Error('Erro na requisição');

    axios.get.mockRejectedValue(mockError);

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await expect(getProducts()).rejects.toThrow('Erro na requisição');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao obter os produtos:',
      mockError,
    );

    consoleErrorSpy.mockRestore();
  });
});
