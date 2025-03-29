
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-2 px-6 w-full backdrop-blur-sm absolute top-6 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-center items-center">
        <img 
          src="/lovable-uploads/42a4ea0f-1310-4d3c-80b1-147996cf9ad9.png" 
          alt="Brahma Logo" 
          className="h-14 md:h-16 mb-0"
        />
      </div>
    </header>
  );
};

export default Header;
