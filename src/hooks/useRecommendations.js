// useRecommendations.js

import { useState } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = (formData) => {
    const recommendations = recommendationService.getRecommendations(
      formData,
      products,
    );

    setRecommendations(recommendations);

    return recommendations;
  };

  return { recommendations, getRecommendations, setRecommendations };
}

export default useRecommendations;
