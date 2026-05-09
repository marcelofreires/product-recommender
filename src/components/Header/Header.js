import React from 'react';

import RDLogo from '../../assets/rd-station-default.svg';

function Header() {
  return (
    <header className="sticky top-0 bg-white w-full py-4 px-8">
      <a href="/">
        <picture className="max-w-screen-md mx-auto flex">
          <img className="max-w-32" src={RDLogo} alt="Marca da RD Station" />
        </picture>
      </a>
    </header>
  );
}

export default Header;
