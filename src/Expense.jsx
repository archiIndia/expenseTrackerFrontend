import { useState, useEffect } from "react";
import {
  createExpense,
  getAllExpenses,
  deleteExpense,
  findOne,
  updateOne,
} from "./Controller/expenseControl";

import {
  Trash2,
  PenLine,
  Loader2,
  ArrowDown,
  Plus,
  LocateIcon,
  ClipboardEdit,
} from "lucide-react";

import moment from "moment";

function Expense() {
  const [income_val, setIncome_val] = useState();
  const [expense, setExpense] = useState();
  const [date, SetDate] = useState();
  const [expenses, setExpenses] = useState([]); //Store all Exp in this
  const [fId, setFId] = useState(null);
  const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
  const [spendingList, setSpendingList] = useState([
    { item_name: "", amount: 100 },
  ]);

  const handleCreateExpense = async () => {
    setIsPerformingAnyAction(true);
    try {
      const data = await createExpense(income_val, expense, date);

      setExpenses([...expenses, data]);
    } catch (error) {
      console.log("error");
    } finally {
      setIsPerformingAnyAction(false);
    }
  };
  const loadAll = async () => {
    try {
      const data = await getAllExpenses();

      setExpenses([...data]);
    } catch (err) {
      console.log("Fault Lines");
    }
  };
  const handleClear = () => {
    setIncome_val("");
    setExpense("");
    SetDate("");
  };
  //Load all Data for One time...
  useEffect(() => {
    loadAll();
  }, []);
  const handleDelete = async (delexpenseId) => {
    setIsPerformingAnyAction(true);
    await deleteExpense(delexpenseId);
    //Store the Expenses which are not Deleted...
    const tempArray = expenses.filter((exxp) => {
      return exxp._id !== delexpenseId;
    });
    setIsPerformingAnyAction(false);
    setExpenses(tempArray);
  };
  const handleFetch = async (fetchId) => {
    setIsPerformingAnyAction(true);
    const fetched = await findOne(fetchId); //get a single Expense from Backend..
    setIsPerformingAnyAction(false);
    setIncome_val(fetched?.income);
    setExpense(fetched?.expense);
    SetDate(moment(fetched?.date)?.format("YYYY-MM-DD"));
    setFId(fetchId);
  };
  const handleUpdate = async () => {
    setIsPerformingAnyAction(true);
    const abc = await updateOne(fId, {
      dateVal: date,
      incomeVal: income_val,
      expenseVal: expense,
    });
    handleClear();
    // find the position we need to update...
    const position = expenses.findIndex((ex) => ex._id === fId);
    const temp = expenses;
    temp[position] = abc; // Replace the old Value with abc Value at position
    setExpenses(temp);
    setIsPerformingAnyAction(false);
  };
  const handleAddItem = () => {
    setSpendingList([...spendingList, { item_name: "", amount: 0 }]);
  };
  const removeItem = async (ind) => {
    const tempArray = spendingList.filter((product, inx) => inx !== ind);
    setSpendingList(tempArray);
  };
  const handleItemNameChange = (item_name, ind) => {
    console.log("Item:", item_name);
    console.log("Index:", ind);
    const temp = [...spendingList];
    temp[ind].item_name = item_name; // Replace the old Value with abc Value at position
    setSpendingList(temp);
  };

  return (
    <div className={"flex flex-row  p-10 gap-6"}>
      <div className={"flex flex-col w-1/3  min-w-72 gap-3 "}>
        <div>Add Expense</div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <label className="" htmlFor={"date"}>
            Date
          </label>

          <input
            id={"date"}
            type="date"
            value={date}
            onChange={(ev) => {
              SetDate(ev.target.value);
            }}
            className="border rounded p-2 w-full outline-none shadow mt-1"
          />
        </div>
        <div>
          <div
            className={
              "text-blue-500 hover:text-blue-600 font-semibold text-sm inline-flex items-center cursor-pointer "
            }
          >
            View more
            <span>
              <ArrowDown className={"w-4 h-4 ml-1"} />
            </span>
          </div>
          <div>
            {spendingList.map((product, index) => (
              <div className={"flex items-center gap-2"} key={index}>
                <div className={"w-2/3"}>
                  <input
                    type="text"
                    value={product.item_name}
                    placeholder="Spend on item"
                    className="border rounded p-2 w-full outline-none shadow mt-1"
                    onChange={(ev) => {
                      handleItemNameChange(ev.target.value, index);
                    }}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={product.amount}
                    placeholder="Amount"
                    className="border rounded p-2 w-full outline-none shadow mt-1 text-right"
                  />
                </div>
                <div>
                  <ClipboardEdit
                    className={"w-4 h-4 "}
                    onClick={() => {
                      removeItem(index);
                    }}
                  />
                </div>
              </div>
            ))}

            <div
              className={
                "text-blue-500 hover:text-blue-600 font-semibold text-sm inline-flex items-center cursor-pointer mt-2 w-full justify-end  "
              }
              onClick={handleAddItem}
            >
              <span>
                <Plus className={"w-4 h-4 "} />
              </span>
              Add more
            </div>
          </div>
        </div>
        <div className={"flex space-x-2 !mt-5 text-sm "}>
          <button
            onClick={handleCreateExpense}
            className="text-blue-600  border bg-blue-200 uppercase font-bold py-2 px-4 rounded items-center flex justify-center"
          >
            {isPerformingAnyAction ? (
              <Loader2 className="animate-spin h-5 w-5 text-white" />
            ) : (
              "Save"
            )}
          </button>
          <button
            onClick={handleUpdate}
            className="text-yellow-600  bg-yellow-50 border uppercase font-bold py-2 px-4 rounded items-center flex justify-center"
          >
            {isPerformingAnyAction ? (
              <LocateIcon className="animate-spin h-5 w-5 text-white" />
            ) : (
              "Update"
            )}
          </button>
          <button
            onClick={handleClear}
            className="text-gray-600 bg-gray-200 border font-medium py-2 px-4 uppercase rounded items-center flex justify-center"
          >
            {isPerformingAnyAction ? (
              <Loader2 className="animate-spin h-5 w-5 text-white" />
            ) : (
              "Clear"
            )}
          </button>
        </div>
      </div>
      <div className={"flex flex-col w-2/3"}>
        <div>Expense List</div>
        <div
          className={
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-2"
          }
        >
          {expenses.map((exp,index) => (
            <div
              key={index}
              className="flex flex-row  w-full rounded shadow-md p-6 border"
            >
              <div className={"flex w-full justify-between"}>
                <div>
                  <div className={"flex flex-col"}>
                    <span
                      className={
                        "text-xs w-fit mb-2 bg-emerald-200 p-1 rounded text-emerald-700"
                      }
                    >
                      {moment(exp.date).format("DD-MMM-YYYY")}
                    </span>
                    <div className={"text-xs"}>Income</div>
                    <div className={"text-4xl mt-2"}>
                      <span className={"text-sm"}>Rs.</span>
                      {exp.income}
                    </div>
                  </div>
                  <div className={"mt-4 flex items-center "}>
                    <div className={"flex flex-col items-end"}>
                      <span className={"text-xs"}>Expense</span>
                      <span
                        className={`w-fit text-md text-right ${
                          //String Interpolation
                          exp.expense > 5000
                            ? "text-red-500 rounded bg-red-200 px-1"
                            : ""
                        } `}
                      >
                        {exp.expense}
                      </span>
                    </div>
                    <div className={"flex flex-col ml-5"}>
                      <span className={"text-xs"}>Balance</span>
                      <span className={"text-md text-right"}>
                        {exp.balance}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {isPerformingAnyAction ? (
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                  ) : (
                    <Trash2
                      onClick={() => {
                        handleDelete(exp._id);
                      }}
                      className="cursor-pointer h-5 w-5 text-red-500"
                    />
                  )}
                  {isPerformingAnyAction ? (
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                  ) : (
                    <PenLine
                      onClick={() => {
                        handleFetch(exp._id);
                      }}
                      className="cursor-pointer h-5 w-5 text-green-500"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Expense;
