import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Tipo de Recomendação</h2>
      <div className="flex items-center">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          id="SingleProduct"
          onChange={() => onRecommendationTypeChange('SingleProduct')}
          className="mr hover:cursor-pointer"
        />
        <label htmlFor="SingleProduct" className="mr-4 hover:cursor-pointer">
          Produto Único
        </label>
        <Checkbox
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          id="MultipleProducts"
          onChange={() => onRecommendationTypeChange('MultipleProducts')}
          className="mr hover:cursor-pointer"
        />
        <label htmlFor="MultipleProducts" className="hover:cursor-pointer">
          Múltiplos Produtos
        </label>
      </div>
    </div>
  );
}

export default RecommendationType;
