import axios from "axios";

const baseURL = "http://localhost:5005/expense";
const token=()=> `Bearer ${localStorage.getItem("token")}`;
const config=() => ({ headers: { Authorization:token() } });
const createExpense = async (income, exp_list, date) => {
  try {
    const json_body = {
      income: income,
      exp_list: exp_list,
      date: date,
    };
    const response = await axios.post(baseURL, json_body, config());
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error; //Propagate the Error to Parent
  }
};
const getAllExpenses = async (page_number=1) => {
  try {
const response = await axios.get(`${baseURL}/getall?page=${page_number}`,config());
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete(baseURL + "/del/" + expenseId,config());
    return response.data;
  } catch (err) {
    console.log("Can not delete expense");
  }
};
const getSingleExpense = async (fId) => {
  try {
    const response = await axios.get(baseURL + "/" + fId,config());
    return response.data;
  } catch (error) {
    console.log("Can not find expense");
  }
};
const updateSingleExpense = async (fId, { incomeVal, exp_list, dateVal }) => {
  try {
    const payload = {
      income: incomeVal,
      exp_list: exp_list,
      date: dateVal,
    };
    const updated = await axios.put(baseURL + "/" + fId, payload,config());
    return updated.data;
  } catch (error) {
    alert("Warning...");
  }
};

export {
  createExpense,
  getAllExpenses,
  deleteExpense,
  getSingleExpense,
  updateSingleExpense,
};
