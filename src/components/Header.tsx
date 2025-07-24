import React from 'react';
import { Store, Phone, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Store className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Baba Jan Fast Food</h1>
              <p className="text-red-100 text-sm">Delicious Food, Fast Service</p>
            </div>
          </div>
          
          <div className="hidden md:flex flex-col space-y-1 text-right text-sm">
            <div className="flex items-center justify-end space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Near Aspire College Girls Campus, FSD Road, Jhang</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Phone className="h-4 w-4" />
              <span>03167750842</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;