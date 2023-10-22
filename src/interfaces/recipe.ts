export interface Recipe {
    id: number,
    title: string,
    image: string,
    imageType: string,
    usedIngredientCount: number,
    missedIngredientCount: number,
    missedIngredients: Ingredient[],
}

export const initialRecipes: Recipe[] = []

interface Ingredient {
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