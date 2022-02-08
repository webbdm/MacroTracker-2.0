import React from "react";

const GoalsBanner = ({ meals }) => {
    const macros = [
        { goal_macro_id: 1, macro_id: "Protein", target_amount: 200, remaining_amount: 50 },
        { goal_macro_id: 2, macro_id: "Fat", target_amount: 200, remaining_amount: 50 },
        { goal_macro_id: 3, macro_id: "Carbohydrates", target_amount: 200, remaining_amount: 50 }
    ];
    const sumMealFoodCalories = foods => {
        let carbCal = 0;
        let fatCal = 0;
        let proteinCal = 0;
        foods.map(f => {
            // all per (1) gram
            carbCal += f.carbohydrate * 4;
            proteinCal += f.protein * 4;
            fatCal += f.fat * 9;
        })
        return [carbCal, proteinCal, fatCal].reduce((a, b) => a + b, 0);
    };

    const getTotalCalories = meals =>
        meals
            .map(m => sumMealFoodCalories(m.foods))
            .reduce((a, b) => a + b, 0);

    const getMacroGroupings = meals => {
        const foodMacros = meals.map(m => m.foods.map(f => ({
            proteinCal: f.protein * 4,
            proteinGrams: f.protein,
            carbsCal: f.carbohydrate * 4,
            carbsGrams: f.carbohydrate,
            fatCal: f.fat * 9,
            fatGrams: f.fat,
            totalFoodCal: [f.carbohydrate * 4, f.fat * 9, f.protein * 4].reduce((a, b) => a + b, 0)
        })));

        let carbCal = 0;
        let fatCal = 0;
        let proteinCal = 0;
        let carbGrams = 0;
        let fatGrams = 0;
        let proteinGrams = 0;

        [].concat.apply([], foodMacros).map(m => {
            proteinCal += m.proteinCal;
            proteinGrams += m.proteinGrams;
            carbCal += m.carbsCal;
            carbGrams += m.carbsGrams;
            fatCal += m.fatCal;
            fatGrams += m.fatGrams;
        });
        return {
            1: { cal: proteinCal, grams: proteinGrams },
            2: { cal: fatCal, grams: fatGrams },
            3: { cal: carbCal, grams: carbGrams },
            totalCal: [proteinCal, carbCal, fatCal].reduce((a, b) => a + b, 0)
        };
    };

    return <div className="flex flex-row flex-nowrap justify-between bg-panel border-b-4 border-accent py-10 pr-2">
        <div className="flex-1 text-white text-center py-2 px-2 flex flex-col justify-center rounded-r-lg bg-background mr-3">
            <h1 className="text-5xl lg:text-6xl">{getTotalCalories(meals)}</h1>
            <h1 className="text-lg lg:text-3xl">Calories</h1>
        </div>

        <div className="flex flex-col flex-wrap flex-1 justify-between">
            {macros.map(({ target_amount, remaining_amount, macro_id, goal_macro_id }) => <div key={macro_id} className="macro-item flex flex-1 flex-row items-start justify-between">
                <div className="flex flex-col justify-between">
                    <div className="text-white text-md lg:text-3xl">{macro_id}</div>
                    <p className="text-xs text-white font-thin">Remaining</p>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <div className="text-white text-sm lg:text-3xl">{getMacroGroupings(meals)[goal_macro_id].cal}</div>
                    <div className="text-white text-xs lg:text-2xl">{remaining_amount}</div>
                </div>
            </div>)}
        </div>
    </div>
}

export default GoalsBanner;