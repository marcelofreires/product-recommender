import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <article className="p-6 md:py-0">
      <h2 className="text-2xl font-bold mb-4">Lista de Recomendações</h2>

      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}

      {recommendations.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {recommendations.map((recommendation, id) => (
            <li
              key={id}
              className="p-4 border-2 rounded-lg ease-in-out transition-colors duration-300 hover:border-blue-500"
            >
              <h3 className="text-xl font-bold sm:text-xl">
                {recommendation.name}
              </h3>
              <h4 className="text-sm">{recommendation.category}</h4>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default RecommendationList;
