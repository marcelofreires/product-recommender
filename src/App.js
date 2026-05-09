import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import Header from './components/Header/Header';
import Intro from './components/Intro/Intro';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  /**
   * Dadas atualizações no formulário, necessário atualizar a lista de recomendações
   */

  const handleSetRecommendations = (recommend) => {
    setRecommendations(recommend);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex flex-col justify-center items-center">
        <Intro />
        <section className="w-full grid md:p-8 md:grid-cols-2 max-w-screen-lg lg:grid-cols-[minmax(300px,400px)_1fr]">
          <aside>
            <Form onRecommendationsUpdate={handleSetRecommendations} />
          </aside>
          <RecommendationList recommendations={recommendations} />
        </section>
      </main>
    </div>
  );
}

export default App;
