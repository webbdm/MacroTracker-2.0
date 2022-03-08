import React, { useContext, useState } from "react"
import { NutritionContext } from "../_app.js";
import GoalsBanner from "../GoalsBanner.js";
import { lifeApi } from "../../providers/api.js";

const Goals = () => {
    const { meals, goal, split, setGoal, setSplit } = useContext(NutritionContext);
    const [editingGoal, setEditingGoal] = useState(false);
    const [goalValue, setGoalvalue] = useState(goal.calories);

    const [proteinSplit, setProteinSplit] = useState(goal.split.proteinSplit);
    const [fatSplit, setFatSplit] = useState(goal.split.fatSplit);
    const [carbohydrateSplit, setCarbohydrateSplit] = useState(goal.split.carbohydrateSplit);

    const handleNameChange = e => setGoalvalue(e.target.value);

    // Build your rows declaratively to provide mapped functions / setters
    const rows = [
        { name: "protein", setter: setProteinSplit, value: proteinSplit },
        { name: "fat", setter: setFatSplit, value: fatSplit },
        { name: "carbohydrates", setter: setCarbohydrateSplit, value: carbohydrateSplit }
    ]

    const handleEdit = () => {
        if (editingGoal) {
            updateGoal();
            setEditingGoal(false);
        } else {
            setEditingGoal(true);
        }
    }

    const updateGoal = async () => {
        const res = await lifeApi.updateGoal({
            id: 1,
            userID: 1,
            calories: parseInt(goalValue),
            split: {
                id: split.id,
                goalID: goal.id,
                proteinSplit: split.protein,
                fatSplit: split.fat,
                carbohydrateSplit: split.carbohydrates
            }
        });
        setGoal(res.data);
    };
    const capitalizeFirstLetter = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }

    return <React.Fragment>
        <GoalsBanner meals={meals} />
        <div className="w-full flex flex-row justify-between flex-wrap p-4 lg:flex-nowrap text-white">
            <div className="w-full lg:w-1/2 flex flex-col text-center m-2">
                <div className="flex flex-row justify-between items-center">
                    {editingGoal ?
                        <input className="text-3xl justify-self-center bg-primary font-bold text-white "
                            value={goalValue}
                            onChange={handleNameChange}
                            placeholder="Name" ></input>
                        : <div className="justify-self-center text-3xl">{goal.calories}</div>}
                    <span className="justify-self-end" onClick={() => handleEdit(!editingGoal)}>{editingGoal ? "Save" : "Edit"}</span>
                </div>
                <div className="text-3xl bg-panel p-2 rounded-md">Calorie Goal</div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col">
                {rows.map(macro =>
                (
                    <div key={macro.name} className="m-2 flex flex-row justify-between bg-panel p-2 rounded-md">
                        <div className="flex flex-row mr-4 items-center">
                            <span className="text-lg">{capitalizeFirstLetter(macro.name)}</span>
                            {editingGoal ? <input className="text-3xl justify-self-center bg-primary font-bold text-white "
                                value={macro.value}
                                onChange={e => macro.setter(e.target.value)}
                                placeholder="Name" ></input> : <span className="ml-2 text-sm">({
                                    Math.round(macro.value)
                                }%)</span>}
                        </div>
                        <span>{goal[macro.name]}g</span>
                    </div>
                ))}
            </div>
        </div>
    </React.Fragment>
};

export default Goals;