import axios from "axios";

const baseURL = "http://localhost:5005/expense";

const createExpense = async (income, exp_list, date) => {
  try {
    const json_body = {
      income: income,
      exp_list: exp_list,
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
    const response = await axios.get(baseURL + "/" + fId);
    return response.data;
  } catch (error) {}
};
const updateOne = async (fId, { incomeVal, exp_list, dateVal }) => {
  try {
    const payload = {
      income: incomeVal,
      exp_list: exp_list,
      date: dateVal,
    };
    const updated = await axios.put(baseURL + "/" + fId, payload);
    return updated.data;
  } catch (error) {
    alert("Warning...");
  }
};

export { createExpense, getAllExpenses, deleteExpense, findOne, updateOne };
