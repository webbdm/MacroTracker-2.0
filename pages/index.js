import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from "react";
import GoalsBanner from "./GoalsBanner.js";
import PWCLogos from "../public/assets/PWC Logos.svg";



const Nutrition = ({ meals, allFoods }) => {
    const foods = [{
        food_name: "Mixed Nuts",
        brand_name: "Kirkland",
        serving_size: "0.5 cup",
        protein: 6,
        carbs: 2,
        fat: 20,
        calories: 100,
    },
    {
        food_name: "Salmon",
        brand_name: "Kirkland",
        serving_size: "8 oz",
        protein: 37,
        carbs: 2,
        fat: 20,
        calories: 220
    },
    {
        food_name: "Machine Whey",
        brand_name: "MTS",
        serving_size: "1 scoop",
        protein: 52,
        carbs: 2,
        fat: 20,
        calories: 150
    },
    ];

    const titles = [
        { title_name: "Meals", img_url: "https://prowebbcore-client.s3.amazonaws.com/Meals", path: "meals" },
        { title_name: "Goals", img_url: "https://prowebbcore-client.s3.amazonaws.com/Goals", path: "goals" },
        { title_name: "Foods", img_url: "https://prowebbcore-client.s3.amazonaws.com/Foods", path: "foods" },
    ];

    return (
        <React.Fragment>
                <GoalsBanner meals={meals}></GoalsBanner>
                <div>
                    {titles.map(title =>
                        <Link href={`/${title.path}`} key={title.title_name}><div style={{ height: '200px' }} className="cursor-pointer relative shadow-2xl flex-grow flex flex-row text-white rounded-lg md:m-6 m-3 bg-panel">
                            <React.Fragment>
                                <div className="backdrop-filter backdrop-blur-sm flex flex-col justify-center text-center w-32 bg-paneltp absolute h-full rounded-l-lg p-4">
                                    <Image alt="logo" src={PWCLogos} />
                                    <h1 className="mt-2">{title.title_name}</h1>
                                </div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="title"
                                    className="rounded-lg border-l border-panel object-cover h-full w-full border-accent"
                                    src={`https://prowebbcore-client.s3.amazonaws.com/${title.title_name}`}
                                />
                                {/* <span className="bg-opacity-50 bg-panel p-1 rounded absolute inline-block bottom-0 ml-40 mb-2 text-black">{item}</span> */}
                            </React.Fragment>
                        </div>
                        </Link>)}
                </div>
                {/* <div>{data && data.length > 0 && data.map(meal => <div key={meal.id} className="text-white">{meal.name}</div>)}</div> */}
        </React.Fragment>
    )
};

export default Nutrition;