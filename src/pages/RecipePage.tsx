import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_KEY, FIND_BY_INGREDIENTS_URL } from '../constants';
import { Recipe, initialRecipes } from '../interfaces/recipe';

/**
 * 
 * @returns 
 */
export default function RecipePage(): ReactElement {
	const location = useLocation();
	const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);

	const splitIngredients = (ingredients: String) => {
		const split = ingredients.split(',');
		var ingredientsString = '';
		for (var i = 0; i < split.length; i++) {
			const currentIngredient = split[i].trim();
			
			ingredientsString += currentIngredient;

			if (i < split.length - 1) {
				ingredientsString += ',+'
			}
		}

		return ingredientsString
	}

	const getRecipe = (ingredients: String) => {
		const ingredientsString = splitIngredients(ingredients);

		// console.log(`${FIND_BY_INGREDIENTS_URL}?${API_KEY}&ingredients=${ingredientsString}&number=100`);

		fetch(`${FIND_BY_INGREDIENTS_URL}?${API_KEY}&ingredients=${ingredientsString}&number=100`)
			.then((response: Response) => response.json())
			.then((data) => {
				setRecipes(data);
			})
	};

	useEffect(() => {
		getRecipe(location.state.query);
	}, []);

  return (
		location.state != null
			? <div className="min-h-screen min-w-screen bg-[#282c34] flex flex-col px-20 py-40 space-y-4">
					<div className="grid place-items-center">
						<h2 className="text-4xl font-semibold text-white">
							Random Recipe
						</h2>
					</div>
					<div className="grid place-items-center">

					</div>
				</div>
			: <div className="min-h-screen min-w-screen bg-[#282c34] grid place-items-center">
					<div className="flex flex-col space-y-4 place-items-center">
						<div className="text-white text-4xl">
							Page Unaccessible
						</div>
						<ButtonToStartPage />
					</div>
				</div>
  );
}

function ButtonToStartPage(): ReactElement {
	const navigate = useNavigate();

	return (
		<div 
			className="rounded-lg text-white px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium cursor-pointer grid place-items-center"
			onClick={() => {
				navigate('/');
			}}
		>
			Back to Start Page
		</div>
	)
}