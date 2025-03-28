
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-3 px-6 w-full backdrop-blur-sm">
      <div className="container mx-auto flex justify-center items-center">
        <img 
          src="/lovable-uploads/8e1f9f5c-38be-41fa-bce4-b2d94010e3cd.png" 
          alt="Robot Face Logo" 
          className="h-12 md:h-16 mb-1"
        />
      </div>
    </header>
  );
};

export default Header;
