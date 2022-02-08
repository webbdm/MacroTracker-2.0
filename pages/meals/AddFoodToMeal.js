import React, { Fragment } from "react";

const AddFoodToMeal = ({ meal, foods, addFood, closeTrigger, sumFoodCalories}) => {
    return <Fragment>
        <div className="px-2 py-1 text-center flex flex-row justify-between">
            <span className="font-bold text-white mx-2">Add foods {meal ? meal.name : ''}</span>
        </div>
        <hr className="border border-b-2 border-accent"></hr>
        <div className="pt-1 flex flex-col justify-between">
            <div className="px-1 flex flex-col justify-between">
                {foods.map(food => <div className="px-1 flex flex-row justify-between" key={food.id}>
                    <div className="mx-2">
                        <span className="text-white mr-2">{food.brand}</span>
                        <span className="text-white">{food.name}</span>
                    </div>
                    <div className="mx-2">
                        <span className="font-bold text-white mx-2">{sumFoodCalories(food)}</span>
                        <span onClick={() => addFood({ MealID: meal.id, FoodId: food.id })} className="font-bold text-accent mx-2 cursor-pointer">+</span>
                    </div>
                </div>)}
            </div>
            {closeTrigger()}
        </div>
    </Fragment>
};

export default AddFoodToMeal;