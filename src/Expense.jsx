import { useState, useEffect } from "react";
import {
  createExpense,
  getAllExpenses,
  deleteExpense,
} from "./Controller/expenseControl";
import { LucideDelete } from "lucide-react";

function Expense() {
  const [income_val, setIncome_val] = useState(0);
  const [expense, setExpense] = useState(0);
  const [date, SetDate] = useState();
  const [expenses, setExpenses] = useState([]); //Store all Exp in this array

  const handleCreateExpense = async () => {
    try {
      const data = await createExpense(income_val, expense, date);
      console.log(data);
      setExpenses([...expenses, data]);
    } catch (error) {
      console.log("error");
    }
  };
  const loadAll = async () => {
    try {
      const data = await getAllExpenses();
      console.log(data);
      setExpenses([...expenses, ...data]);
    } catch (err) {
      console.log("Fault Lines");
    }
  };
  useEffect(() => {
    loadAll();
  }, []);
  const handleDelete = async (expenseId) => {
    await deleteExpense(expenseId);
  };

  return (
    <div>
      <input
        type="number"
        value={income_val}
        onChange={(ev) => {
          setIncome_val(ev.target.value);
        }}
        placeholder="Income"
        className=""
      />
      <input
        type="number"
        value={expense}
        onChange={(ev) => {
          setExpense(ev.target.value);
        }}
        placeholder="Expense"
        className=""
      />
      <input
        type="date"
        value={date}
        onChange={(ev) => {
          SetDate(ev.target.value);
        }}
        className=""
      />
      <button onClick={handleCreateExpense}>
        <b>Save</b>
      </button>
      {income_val - expense}
      {expenses.map((exp) => (
        <div className="flex flex-col p-3 m-2 bg-yellow-500 w-[100px] ">
          <h2>{exp.income}</h2>
          <p>{exp.expense}</p>
          <h3>{exp.balance}</h3>
          <LucideDelete
            onClick={() => {
              handleDelete(exp._id);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Expense;
