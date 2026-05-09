import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('<Header />', () => {
  test('Exibe cabeçalho com a logo em uma imagem', () => {
    render(<Header />);

    const image = screen.getByRole('img', {
      name: 'Marca da RD Station',
    });

    expect(image).toBeVisible();
  });
});
