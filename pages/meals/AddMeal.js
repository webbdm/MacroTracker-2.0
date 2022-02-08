import React, { Fragment, useState, useContext } from "react";
import { NutritionContext } from "../index.js";

const AddMeal = ({ closeTrigger, onClose, sumFoodCalories }) => {
    const { allFoods, setMeals, createMeal, meals } = useContext(NutritionContext);
    const [foods] = useState(allFoods);
    const [meal, setMeal] = useState({ name: "", date: Date.now, foods: [] });
    const [name, setName] = useState(meal.name);

    const saveAndClose = () => {
        addMeal();
        onClose();
    }; 
    const handleNameChange = e => setName(e.target.value);
    const addFoodToMeal = food => setMeal({ ...meal, foods: [...meal.foods, food] });
    const addMeal = async () => setMeals([...meals, await (await createMeal({ ...meal, name: name })).data]);

    return <Fragment>
        <div className="px-2 py-1 text-center flex flex-row">
            <input className="w-full bg-panel font-bold text-white mx-2"
                value={name}
                onChange={handleNameChange}
                placeholder="Name" ></input>
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
                        <span onClick={() => addFoodToMeal(food)} className="font-bold text-accent mx-2 cursor-pointer">+</span>
                    </div>
                </div>)}
            </div>
            <div className="flex flex-row w-100">
                {closeTrigger()}
                <div className="w-full text-bg mt-3 rounded-br-lg bg-accent font-bold text-center cursor-pointer" onClick={() => saveAndClose()}>Save</div>
            </div>
        </div>
    </Fragment>
};

export default AddMeal;