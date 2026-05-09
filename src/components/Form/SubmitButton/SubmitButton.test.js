import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SubmitButton from './SubmitButton';

const mockOnClickToSubmit = jest.fn();

describe('<SubmitButton />', () => {
  test('Exibe o botão do formulário', () => {
    render(
      <SubmitButton
        text="Obter recomendação"
        onClickToSubmit={mockOnClickToSubmit}
      />,
    );

    const button = screen.getByRole('button', {
      name: 'Obter recomendação',
    });

    expect(button).toBeVisible();
  });

  test('Dispara a função onClickToSubmit quando o usuário clica no botão', async () => {
    render(
      <SubmitButton
        text="Obter recomendação"
        onClickToSubmit={mockOnClickToSubmit}
      />,
    );

    const button = screen.getByRole('button', {
      name: 'Obter recomendação',
    });

    await userEvent.click(button);

    expect(mockOnClickToSubmit).toHaveBeenCalledTimes(1);
  });
});
