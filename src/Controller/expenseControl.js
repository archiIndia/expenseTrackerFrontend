import axios from "axios";

const baseURL = "http://localhost:5005/expense";

const createExpense = async (income, exp, date) => {
  try {
    const json_body = {
      income: income,
      expense: exp,
      date: date,
    };
    const response = await axios.post(baseURL, json_body);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error; //Propagate the Error to Parent
  }
};
const getAllExpenses = async () => {
  try {
    const response = await axios.get(baseURL + "/getall");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete(baseURL + "/del/" + expenseId);
    console.log("abs", response);
    return response.data;
  } catch (err) {}
};
const findOne = async (fId) => {
  try {
    const response= await axios.get(baseURL+ "/"+ fId)
    return response.data;
  } catch (error) {}
};
const updateOne= async()

export { createExpense, getAllExpenses, deleteExpense,findOne };
