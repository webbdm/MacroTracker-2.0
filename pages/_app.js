import '../styles/globals.css'
import React, { useState, useContext } from 'react';
import { lifeApi } from "../providers/api";

export const NutritionContext = React.createContext("Nutrition");

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

function MyApp({ Component, pageProps, props }) {
  const [meals, setMeals] = useState(pageProps.meals);
  const [allFoods, setAllFoods] = useState(pageProps.allFoods);

  const [goal, setGoal] = useState(pageProps.goal);
  const [split, setSplit] = useState(goal.split);

  return (<NutritionContext.Provider value={{
    allFoods,
    meals,
    goal,
    split,
    setSplit,
    setGoal,
    setMeals,
    setAllFoods,
    addFoodToMeal: lifeApi.addFoodToMeal,
    createMeal: lifeApi.createMeal,
    deleteMeal: lifeApi.deleteMeal,
    deleteFoodFromMeal: lifeApi.deleteFoodFromMeal
  }}>
    <div className="h-screen bg-background">
      <Component {...pageProps} />
    </div>
    <div id="modal-root"></div>

  </NutritionContext.Provider>)
}

MyApp.getInitialProps = async (appContext) => {
  //const appProps = await App.getInitialProps(appContext)
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

  const mappedMeals = meals => meals.map((m => ({
    id: m.id,
    name: m.name,
    date: m.date,
    calories: sumMealFoodCalories(m.foods),
    foods: m.foods.map((f) => ({
      id: f.id,
      food_name: f.name,
      brand_name: f.brand,
      serving_size: "1 scoop",
      protein: f.protein,
      carbohydrate: f.carbohydrate,
      fat: f.fat,
      calories: 150
    }))
  })));

  const goal = await lifeApi.getGoal(1);
  const meals = await lifeApi.getMeals();
  const foods = await lifeApi.getAllFoods();

  const mealData = meals.data;
  const foodData = foods.data;
  const goalData = goal.data;

  return {
    pageProps: { meals: mappedMeals(mealData), allFoods: foodData, goal: goalData }
  }
}


export default MyApp
