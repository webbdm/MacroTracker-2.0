import React, { useState, useContext } from "react";
import { NutritionContext } from "../_app.js";
import Modal from "../../components/global/modal/Modal";
import AddFoodToMeal from "./AddFoodToMeal";
import AddMeal from "./AddMeal";
import GoalsBanner from "../GoalsBanner.js";

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    minWidth: "50%",
    transform: 'translate(-50%, -50%)',
    zIndex: 1000
}

const Meals = () => {
    const [isAddingFood, setIsAddingFood] = useState(false);
    const [isAddingMeal, setIsAddingMeal] = useState(false);
    const [meal, setMeal] = useState(null);
    const { allFoods, addFoodToMeal, deleteFoodFromMeal, meals, setMeals, deleteMeal } = useContext(NutritionContext);

    const openAddingFoodModal = meal => {
        setIsAddingFood(true);
        setMeal(meal);
    };

    const openAddingMealModal = meal => {
        setIsAddingMeal(true);
        setMeal(meal);
    };

    const closeAddMealModal = () => {
        setIsAddingMeal(false);
        setMeal(null);
    };

    const closeAddFoodModal = () => {
        setIsAddingFood(false);
        setMeal(null);
    };

    const addFood = async (food) => {
        const addedFood = await addFoodToMeal(food);
        setMeals(meals.map(m => m.id === addedFood.data.mealId ? {
            ...m, foods: [...m.foods, {
                ...addedFood.data,
                brand_name: addedFood.data.name,
                food_name: addedFood.data.name
            }]
        } : m));
        closeAddFoodModal();
    };

    const handleMealDelete = async mealID => {
        const deletedMealId = await (await deleteMeal(mealID)).data.id;
        setMeals(meals.filter(m => m.id != deletedMealId));
    };

    const handleFoodDelete = async (mealID, mealFoodID) => {
        await deleteFoodFromMeal(mealFoodID);
        setMeals(meals.map(m => m.id === mealID ? { ...m, foods: m.foods.filter(f => f.id != mealFoodID) } : m));
    };

    const sumFoodCalories = food => [food.carbohydrate * 4, food.protein * 4, food.fat * 9].reduce((a, b) => a + b, 0);

    return <React.Fragment>
        <GoalsBanner meals={meals} />
        <div className="flex flex-col py-2">
            <div className="flex flex-row justify-end">
                <div className="bg-accent cursor-pointer rounded-lg p-3 mr-2 font-bold text-primary" onClick={() => openAddingMealModal()}>+ Add Meal</div>
            </div>
            <div className="flex flex-row flex-wrap h-100 py-1">
                <Modal isOpen={isAddingFood} onClose={() => closeAddFoodModal()}>
                    <div style={MODAL_STYLES} className="filter drop-shadow-2xl rounded-lg bg-panel">
                        <AddFoodToMeal
                            meal={meal}
                            foods={allFoods}
                            addFood={addFood}
                            sumFoodCalories={sumFoodCalories}
                            closeTrigger={() => <div onClick={() => closeAddFoodModal()} className="text-bg mt-3 rounded-bl-lg rounded-br-lg bg-accent font-bold text-center cursor-pointer">X Close</div>}
                        />
                    </div>
                </Modal>
                <Modal isOpen={isAddingMeal} onClose={() => closeAddMealModal()}>
                    <div style={MODAL_STYLES} className="filter drop-shadow-2xl rounded-lg bg-panel">
                        <AddMeal
                            sumFoodCalories={sumFoodCalories}
                            onClose={() => closeAddMealModal()}
                            closeTrigger={() => <div onClick={() => closeAddMealModal()} className="w-full text-bg mt-3 rounded-bl-lg bg-accent font-bold text-center cursor-pointer">Cancel</div>} />
                    </div>
                </Modal>
                {meals && meals.map(meal => <div className="m-2 flex-1" key={meal.id}>
                    <div className="rounded-lg bg-panel">
                        <div className="px-2 py-1 text-center flex flex-row justify-between">
                            <span className="font-bold text-white mx-1 flex flex-row showable cursor-pointer">{meal.name} <span onClick={() => handleMealDelete(meal.id)} className="text-red-600 mx-2 showable-target">X</span></span>
                            <span className="font-bold text-white mx-1"><span className="mr-2 text-sm font-thin"> Calories</span>{meal.calories}</span>
                        </div>
                        <hr className="border border-b-2 border-accent"></hr>
                        <div className="pt-1 flex flex-col justify-between">
                            <div className="px-1 flex flex-row justify-between">
                            </div>
                            {meal.foods.map(food => <div className="showable cursor-pointer px-1 flex flex-row justify-between" key={food.id}>
                                <div className="flex flex-row">
                                    <span className="font-bold text-white mx-2">{food.brand_name}</span>
                                    <span className="text-white mx-2">{food.food_name}</span>
                                    <span className="showable-target font-bold text-red-600 mx-2" onClick={() => handleFoodDelete(meal.id, food.id)}>x</span>
                                </div>
                                <span className="font-bold text-white mx-2">{sumFoodCalories(food)}</span>
                            </div>)}
                            <div onClick={() => openAddingFoodModal(meal)} className="mt-3 rounded-bl-lg rounded-br-lg bg-accent font-bold text-center cursor-pointer">+ Add</div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </React.Fragment>
};

export default Meals;