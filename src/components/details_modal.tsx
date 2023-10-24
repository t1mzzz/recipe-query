import { Ingredient } from "../interfaces/recipe";

export default function DetailsModal({recipe, setDisplayDetails}: any) {
    return (
        <div className="text-black flex place-items-center items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-[5px] bg-black/50">
            
            <div className="grid w-[40%] h-[70%] bg-white rounded-lg py-12">
                <div className="grid justify-center font-semibold text-xl">
                    <div className="px-20">
                        <div className="text-center grid justify-center rounded-full bg-black w-8 h-8 text-xs text-white p-2 cursor-pointer z-20 hover:scale-110 transition ease-in-out" onClick={() => setDisplayDetails(false)}>
                            X
                        </div>
                    </div>
                    Missing Ingredients: {recipe.missedIngredientCount}
                </div>
                <div className="grid place-items-center text-left">
                    {/* {console.log(recipe.missedIngredients)} */}
                    {recipe.missedIngredients.map((ingredient: Ingredient) => (
                        <div className="font-medium">
                            - {ingredient.original}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}