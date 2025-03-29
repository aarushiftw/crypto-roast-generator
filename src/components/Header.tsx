
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    // Redirect to home page
    navigate('/');
    // Force a page refresh to reset the app state
    window.location.reload();
  };
  
  return (
    <header className="py-2 px-6 w-full absolute top-6 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-center items-center">
        <img 
          src="/lovable-uploads/42a4ea0f-1310-4d3c-80b1-147996cf9ad9.png" 
          alt="Brahma Logo" 
          className="h-16 md:h-18 cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>
    </header>
  );
};

export default Header;
