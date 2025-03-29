
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-3 px-6 w-full backdrop-blur-sm">
      <div className="container mx-auto flex justify-center items-center">
        <img 
          src="/lovable-uploads/a3ef07be-8fc5-44c1-941a-afe3858bb8bd.png" 
          alt="Brahma Mint Logo" 
          className="h-12 md:h-16 mb-1"
        />
      </div>
    </header>
  );
};

export default Header;
