import React, { MouseEventHandler, ReactElement, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_KEY, FIND_BY_INGREDIENTS_URL } from '../constants';
import { Recipe, initialRecipe, initialRecipes } from '../interfaces/recipe';
import DetailsModal from '../components/details_modal';

/**
 * The recipe page.
 * @returns A recipe page that contains the title, name of recipe, picture of recipe, and a few buttons.
 */
export default function RecipePage(): ReactElement {
	const location = useLocation();
	const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
	const [recipeToDisplay, setRecipeToDisplay] = useState<Recipe>(initialRecipe);
	const [recentIndex, setRecentIndex] = useState<number>(-1);
	const [displayDetails, setDisplayDetails] = useState<boolean>(false);

	/**
	 * Generates a random integer from 0 to less than max.
	 * 
	 * @param max The maximum range of the random number.
	 * @returns A random number ranging from 0 inclusive to max exclusive.
	 */
	const getRandomInt = (max: number): number => {
		const newRandom: number = Math.floor(Math.random() * max);
		return !(max < 2) && newRandom === recentIndex 
			? getRandomInt(max)
			: newRandom
	};

	/**
	 * Updates the user's raw input into a formatted String suitable for the API query parameter.
	 * 
	 * @param ingredients The user's raw and unchanged input ingredients.
	 * @returns Ingredients formatted with ',+' in between them for API use.
	 */
	const splitIngredients = (ingredients: String): String => {
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

	/**
	 * Fetches from API the list of recipes that include inputted ingredients.
	 * 
	 * @param ingredients The user's raw and unchanged input ingredients.
	 */
	const getRecipe = (ingredients: String): void => {
		const ingredientsString = splitIngredients(ingredients);

		fetch(`${FIND_BY_INGREDIENTS_URL}?${API_KEY}&ingredients=${ingredientsString}&number=100`)
			.then((response: Response) => response.json())
			.then((data: Recipe[]) => {
				console.log(data);
				setRecipes(data);
			})
			.catch((error) => {
        console.log(error);
      });
	};

	/**
	 * Fetches recipe data upon startup.
	 */
	useEffect(() => { // useEffect hook 
		// setTimeout(() => { // simulate a delay 
		getRecipe(location.state.query);
		console.log(recipes)
		// }, 2000); 
	}, [location.state.query]); 

	/**
	 * Setting initial index of recipe to display and recipe to display.
	 */
	useEffect(() => {
		setRecentIndex(getRandomInt(recipes.length));
		setRecipeToDisplay(recipes[recentIndex]);
		console.log("RECIPE TO DISPLAY", recipeToDisplay);
	}, [recipes]);

	const openDetails = () => { 
		setDisplayDetails(true);
	}

  	return (
		location.state != null
			? <div className="min-h-screen min-w-screen bg-[#282c34] flex flex-col px-20 py-40 space-y-4 text-white">
					<div className="grid place-items-center">
						<h2 className="text-4xl font-semibold">
							Random Recipe
						</h2>
					</div>
					<div className="grid place-items-center">
						{recipeToDisplay != undefined ? recipeToDisplay.title : ''}
						<div className="m-4">
							<img src={recipeToDisplay != undefined ? recipeToDisplay.image : ''} alt={recipeToDisplay != undefined ? recipeToDisplay.title : ''}/>
						</div>
					</div>
					{recipes.length > 1
						? <div className="flex flex-col space-y-2">
								<div className="grid place-items-center">
									<GenerateNewRecipe setNewRecipe={() => {
										setRecipeToDisplay(recipes[getRandomInt(recipes.length)]);
									}}/>
								</div>
								<div className="grid place-items-center">
									<div 
										className="w-fit rounded-lg text-white px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium cursor-pointer grid place-items-center"
										onClick={openDetails}
									>
										Check Recipe Details
									</div>
								</div>
							</div>
						: <div></div>
					}
					<div className="grid place-items-center">
						<ButtonToStartPage/>
					</div>
					{
						displayDetails && <DetailsModal recipe={recipeToDisplay} setDisplayDetails={setDisplayDetails}/>
					}
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

/**
 * Displays a button to switch between recipes with current input.
 *
 * @param setNewRecipe A callback function that switches the recipes.
 * @returns A button that generates another random recipe with current ingredients on click.
 */
function GenerateNewRecipe({setNewRecipe}: any): ReactElement {
	return (
		<div 
			className="w-fit rounded-lg text-white px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium cursor-pointer grid place-items-center"
			onClick={setNewRecipe}
		>
			Get Other Recipe
		</div>
	)
}

/**
 * Displays a button to switch back to the home page.
 * 
 * @returns A button that navigates back to the home page on click.
 */
function ButtonToStartPage(): ReactElement {
	const navigate = useNavigate();

	return (
		<div 
			className="w-fit rounded-lg text-white px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium cursor-pointer grid place-items-center"
			onClick={() => {
				navigate('/');
			}}
		>
			Back to Start Page
		</div>
	)
}