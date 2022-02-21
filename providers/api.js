import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`; //
const BUCKET_NAME = `${process.env.NEXT_PUBLIC_API_BUCKET_NAME}`; //
//const API_BASE_URL = `http://localhost:3000/api`; // Used for my local testing purposes

export const authApi = {
  showLoginPage: () => axios.get(`${process.env.AUTH_HOST}`),
  getToken: async data => {
    return await axios({
      method: 'post',
      url: `${process.env.AUTH_HOST}/auth/token`,
      data: data
    });
    //return await axios.post(`${process.env.AUTH_HOST}/auth/token`, { crossdomain: true }, data)
  }
};

export const userApi = {
  getUser: async (id) => await axios.get(`${API_BASE_URL}/user/${id}`),
  update: async (id, update) =>
    await axios.put(`${API_BASE_URL}/user/${id}`, update),
};

export const projectApi = {
  create: async (project) => {
    return await axios.post(`${API_BASE_URL}/projects`, project);
  },
  update: async (id, update) => {
    return await axios.put(`${API_BASE_URL}/projects/${id}`, update)
  }
};

export const fileApi = {
  upload: async (files, type) =>
    await axios.post(`${API_BASE_URL}/files/${BUCKET_NAME}/add`, files),
};

export const lifeApi = {
  getMeals: async () =>
    await axios.get(`${API_BASE_URL}/meal`),
  getAllFoods: async () =>
    await axios.get(`${API_BASE_URL}/food`),
  createMeal: async meal =>
    await axios.post(`${API_BASE_URL}/meal`, meal),
  deleteMeal: async mealID =>
    await axios.delete(`${API_BASE_URL}/meal/deleteMeal/${mealID}`),
  addFoodToMeal: async body =>
    await axios.post(`${API_BASE_URL}/meal/addFood`, body),
  deleteFoodFromMeal: async mealFoodID =>
    await axios.delete(`${API_BASE_URL}/meal/deleteFood/${mealFoodID}`),
  getGoal: async goalID => 
    await axios.get(`${API_BASE_URL}/goal/${goalID}`),
  updateGoal: async goal => axios.put(`${API_BASE_URL}/goal`, goal)
};