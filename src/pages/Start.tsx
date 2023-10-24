import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * The start page, with a title, search bar, and button for search. 
 * @returns A Start Page with a title, search bar, and button for search.
 */
export default function Start(): ReactElement {
  return (
    <div className="min-h-screen min-w-screen bg-[#282c34] flex flex-col px-20 py-40 space-y-4 overflow-scroll">
      <div className="grid place-items-center">
        <h2 className="text-4xl font-semibold text-white">
          Recipe Query
        </h2>
      </div>
      <div className="grid place-items-center">
        <div className="flex flex-col items-start space-y-1">
          <div className="ml-1 text-base text-white font-medium content-start">
            Search Ingredient
          </div>
          <SearchIngredientsBar />
        </div>
      </div>
    </div>  
  );
}

/**
 * The search bar in the home page.
 * @returns A functional search bar that is used for user to input ingredients.
 */
function SearchIngredientsBar(): ReactElement {
  const [ingredientQuery, setIngredientQuery] = useState<string>('');
  const [displayError, setDisplayError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (ingredientQuery !== '') {
      setDisplayError(false);
      navigate('/recipe', {
        state: {
          query: ingredientQuery
        }
      });
    } else {
      setDisplayError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>   
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg 
            className="w-4 h-4 text-gray-500 dark:text-gray-400" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 20 20"
          >
            <path 
              stroke="currentColor" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input 
          type="text" 
          id="default-search" 
          className="block p-4 pl-10 pr-24 text-sm text-gray-900 border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" 
          value={ingredientQuery} 
          placeholder="ing1, ing2, ing3, ..." 
          onChange={((event: React.ChangeEvent<HTMLInputElement>) => {
            setIngredientQuery(event.target.value);
          })}
        />
        <button 
          type="submit" 
          className="absolute right-2.5 bottom-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
      {displayError
        ? <div className="text-red-400">
            Query cannot be empty.
          </div>
        : <div></div>
      }
    </form>
  )
}
