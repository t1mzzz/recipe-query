export interface Recipe {
    id: number,
    title: string,
    image: string,
    imageType: string,
    usedIngredientCount: number,
    missedIngredientCount: number,
    missedIngredients: Ingredient[],
}

export interface Ingredient {
    id: number,
    amount: number,
    unit: string,
    unitLong: string,
    unitShort: string,
    aisle: string,
    name: string,
    original: string,
    originalName: string,
    meta: string[],
    extendedName: string,
    image: string
}

const initialMissedIngredients: Ingredient[] = [];


export const initialRecipe: Recipe = {
    id: -1,
    title: "",
    image: "",
    imageType: "",
    usedIngredientCount: -1,
    missedIngredientCount: -1,
    missedIngredients: initialMissedIngredients
}

export const initialRecipes: Recipe[] = []


