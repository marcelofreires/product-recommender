import React from 'react';

function SubmitButton({ text, onClickToSubmit }) {
  return (
    <button
      type="submit"
      onClick={onClickToSubmit}
      className="bg-blue-700 hover:bg-blue-900 transition-colors ease-in-out text-white font-bold py-2 px-4 rounded"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
