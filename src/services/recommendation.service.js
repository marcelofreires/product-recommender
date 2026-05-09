// getRecommendations.js

const getRecommendations = (formData, products) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  const scoredProducts = products.map((product) => {
    const preferenceMatches = selectedPreferences.filter((pref) =>
      product.preferences.includes(pref),
    ).length;

    const featureMatches = selectedFeatures.filter((feature) =>
      product.features.includes(feature),
    ).length;

    const totalMatches = preferenceMatches + featureMatches;

    return {
      ...product,
      matchScore: totalMatches,
    };
  });

  const matchedProducts = scoredProducts.filter(
    (product) => product.matchScore > 0,
  );

  if (matchedProducts.length === 0) {
    return [];
  }

  if (selectedRecommendationType === 'SingleProduct') {
    const maxScore = Math.max(
      ...matchedProducts.map((item) => item.matchScore),
    );

    const lastProductWithHighestScore = matchedProducts.findLast(
      (item) => item.matchScore === maxScore,
    );

    return [lastProductWithHighestScore];
  }

  return matchedProducts;
};

const recommendationService = {
  getRecommendations,
};

export default recommendationService;
