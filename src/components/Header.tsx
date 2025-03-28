
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 w-full">
      <div className="container mx-auto flex justify-center">
        <h1 className="terminal-text text-2xl md:text-3xl font-bold tracking-tight animate-pulse">
          CRYPTO ROAST BOT
        </h1>
      </div>
    </header>
  );
};

export default Header;
