import React from 'react';

function Intro() {
  return (
    <section className="bg-slate-100 p-8 md:py-12 w-full ">
      <div className="max-w-screen-md mx-auto grid gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Recomendador de Produtos RD Station
        </h1>
        <h2 className="text-sm font-semibold">
          Aqui você pode encontrar uma variedade de produtos da RD Station, cada
          um projetado para atender às necessidades específicas do seu negócio.
          De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma
          solução para ajudar você a alcançar seus objetivos.
        </h2>
        <p className="text-xs">
          Use o formulário abaixo para selecionar suas preferências e
          funcionalidades desejadas e receba recomendações personalizadas de
          produtos que melhor atendam às suas necessidades.
        </p>
      </div>
    </section>
  );
}

export default Intro;
