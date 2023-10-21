import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 
 * @returns 
 */
export default function RecipePage(): ReactElement {
  return (
    <div className="min-h-screen min-w-screen bg-[#282c34] flex flex-col px-20 py-40 space-y-4">
      <div className="grid place-items-center">
        <h2 className="text-3xl font-medium text-white">
          Recipe Query
        </h2>
      </div>
      <div className="grid place-items-center">
      </div>
    </div>  
  );
}