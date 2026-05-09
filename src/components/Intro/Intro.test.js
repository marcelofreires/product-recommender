import { render, screen } from '@testing-library/react';

import Intro from './Intro';

describe('<Intro />', () => {
  test('Exibe a seção de introdução ao recomendador de produtos', () => {
    render(<Intro />);

    const introTitle = screen.getByRole('heading', {
      name: 'Recomendador de Produtos RD Station',
    });
    const introSubTitle = screen.getByRole('heading', {
      name: 'Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos.',
    });
    const introInstructions = screen.getByText(
      'Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.',
    );

    expect(introTitle).toBeVisible();
    expect(introSubTitle).toBeVisible();
    expect(introInstructions).toBeVisible();
  });
});
