import { useState, useEffect } from "react";
import {
  createExpense,
  getAllExpenses,
  deleteExpense,
  findOne
} from "./Controller/expenseControl";
import { LucideDelete, Trash2,PenLine } from "lucide-react";

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
      setExpenses([...data]);
    } catch (err) {
      console.log("Fault Lines");
    }
  };
  const handleClear = () => {
    setIncome_val(0);
    setExpense(0);
    SetDate("");
  };
  useEffect(() => {
    loadAll();
  }, []);
  const handleDelete = async (delexpenseId) => {
    await deleteExpense(delexpenseId);
    //Store the Expenses which are not Deleted...
    const tempArray = expenses.filter((exxp) => {
      return exxp._id !== delexpenseId;
});
    setExpenses(tempArray);
  };
  const handleFetch= async(fetchId)=>{
    const fetched= await findOne(fetchId);
    setIncome_val(fetched.income);
    setExpense(fetched.expense);
    SetDate(fetched.date);
  }

  return (
    <div className={"flex flex-col items-center mt-5"}>
      <div className={"flex flex-col w-1/3 space-y-2 min-w-72"}>
        <label className=" font-bold" htmlFor={"income"}>
          Income
        </label>
        <input
          id={"income"}
          type="number"
          value={income_val}
          onChange={(ev) => {
            setIncome_val(ev.target.value);
          }}
          placeholder="Income"
          className="border rounded p-2 w-full outline-none shadow"
        />
        <label className=" font-bold" htmlFor={"expense"}>
          Expense
        </label>

        <input
          id={"expense"}
          type="number"
          value={expense}
          onChange={(ev) => {
            setExpense(ev.target.value);
          }}
          placeholder="Expense"
          className="border rounded p-2 w-full outline-none shadow"
        />
        <label className=" font-bold" htmlFor={"date"}>
          Date
        </label>

        <input
          id={"date"}
          type="date"
          value={date}
          onChange={(ev) => {
            SetDate(ev.target.value);
          }}
          className="border rounded p-2 w-full outline-none shadow"
        />
        <div className={"grid grid-cols-2 space-x-2 !mt-5"}>
          <button
            onClick={handleCreateExpense}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear All
          </button>
        </div>
      </div>
      <div className={"flex flex-col w-1/3 m-w-72 space-y-4 mt-4"}>
        {expenses.map((exp, index) => (
          <div
            key={index}
            className="flex flex-row  w-full rounded shadow shadow-lg p-6"
          >
            <div className={"flex w-full justify-between"}>
              <div>
                <div className={"flex flex-col"}>
                  <span className={"text-xs"}>Income</span>
                  <div className={"text-4xl mt-2"}>
                    <span className={"text-sm"}>Rs.</span>
                    {exp.income}
                  </div>
                </div>
                <div className={"mt-4 flex items-center "}>
                  <div className={"flex flex-col"}>
                    <span className={"text-xs"}>Expense</span>
                    <span className={"text-md text-right"}>{exp.expense}</span>
                  </div>
                  <div className={"flex flex-col ml-5"}>
                    <span className={"text-xs"}>Balance</span>
                    <span className={"text-md text-right"}>{exp.balance}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Trash2
                  onClick={() => {
                    handleDelete(exp._id);
                  }}
                  className="cursor-pointer h-5 w-5 text-red-500"
                />
                <PenLine onClick={()=>{
                  handleFetch(exp._id);
                }}
                className="cursor-pointer h-5 w-5 text-green-500"/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Expense;
