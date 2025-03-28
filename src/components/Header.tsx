
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 w-full backdrop-blur-sm">
      <div className="container mx-auto flex justify-center items-center">
        <img 
          src="/lovable-uploads/8e1f9f5c-38be-41fa-bce4-b2d94010e3cd.png" 
          alt="Robot Face Logo" 
          className="h-16 md:h-20 mb-2 animate-pulse"
        />
      </div>
    </header>
  );
};

export default Header;
