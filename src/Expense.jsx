import { useState, useEffect } from "react";
import {
  createExpense,
  getAllExpenses,
  deleteExpense,
  getSingleExpense,
  updateSingleExpense,
} from "./Services/expenseControl";

import {
  Loader2,
  Plus,
  LocateIcon,
  XCircle,
  Copy,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react";

import moment from "moment";
import { ExpenseList } from "./ExpenseList";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { cn } from "@/lib/utils.js";
import {useLocation} from "react-router-dom"

function Expense() {
  const [income_val, setIncome_val] = useState("");
  const [expense, setExpense] = useState(0);
  const [date, SetDate] = useState();
  const [expenses, setExpenses] = useState([]); //Store all Exp in this
  const [fId, setFId] = useState(null);
  const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
  const [spendingList, setSpendingList] = useState([
    { item_name: "", amount: "" },
  ]);
  const { search } = useLocation();

  const handleCreateExpense = async () => {
    setIsPerformingAnyAction(true);
    try {
      const data = await createExpense(Number(income_val), spendingList, date);

      setExpenses([...expenses, data]);
    } catch (error) {
      console.log("error");
    } finally {
      setIsPerformingAnyAction(false);
    }
  };
  const loadAllExpenses = async () => {
    try {
      const params= new URLSearchParams(search);
      const currentPage = params.get("page");
      const data = await getAllExpenses(currentPage);
      setExpenses([...data]);
    } catch (err) {
      console.log("Fault Lines");
    }
  };
  const resetAllFields = () => {
    setFId(null);
    setIncome_val("");
    SetDate("");
    setSpendingList([{ item_name: "", amount: "" }]);
    setExpense(0);
  };

  //Load all Data for One time...
  useEffect(() => {
    loadAllExpenses();
  }, [search]);

  const handleDelete = async (delExpenseId) => {
    setIsPerformingAnyAction(true);
    await deleteExpense(delExpenseId);
    //Store the Expenses which are not Deleted...
    const tempArray = expenses.filter((exp) => {
      return exp._id !== delExpenseId.toString();
    });
    setIsPerformingAnyAction(false);
    setExpenses(tempArray);
  };
  const handleFetch = async (fetchId) => {
    setIsPerformingAnyAction(true);
    const fetched = await getSingleExpense(fetchId); //get a single Expense from Backend..
    setIsPerformingAnyAction(false);
    setIncome_val(fetched?.income);
    setExpense(fetched?.expenseTotal);
    SetDate(moment(fetched?.date)?.format("YYYY-MM-DD"));
    setSpendingList(fetched?.itemList);
    setFId(fetchId);
  };
  const handleUpdate = async () => {
    setIsPerformingAnyAction(true);
    const abc = await updateSingleExpense(fId, {
      dateVal: date,
      incomeVal: income_val,
      exp_list: spendingList,
    });
    resetAllFields();
    // find the position we need to update...
    const position = expenses.findIndex((ex) => ex._id === fId);
    const temp = expenses;
    temp[position] = abc; // Replace the old Value with abc Value at position
    setExpenses(temp);
    setIsPerformingAnyAction(false);
  };

  // spending list related functions
  const handleAddSpendingItem = () => {
    setSpendingList([...spendingList, { item_name: "", amount: "" }]);
  };
  const handleSpendingItemRemove = (ind) => {
    const tempArray = spendingList.filter((product, inx) => inx !== ind);
    setSpendingList(tempArray);
    const Total = calTotalExpenseFromSpendingList(tempArray);
    setExpense(Total);
  };
  const handleSpendingItemNameChange = (name, ind) => {
    const temp = [...spendingList];
    temp[ind].item_name = name; // Replace the old Value with new Value at position
    setSpendingList(temp);
  };
  const handleSpendingItemAmountChange = (amount, ind) => {
    const temp = [...spendingList];
    temp[ind].amount = Number(amount);
    setSpendingList(temp);
    const Total = calTotalExpenseFromSpendingList(temp);
    setExpense(Total);
  };
  const calTotalExpenseFromSpendingList = (list) => {
    let totalExpense = 0;
    for (let exp of list) {
      totalExpense += exp.amount;
    }
    return totalExpense;
  };
  const handleSpendingItemCopy = (index) => {
    const temp = [...spendingList];
    let ind = index + 1;
    const cloned = { ...temp[index] };
    temp.splice(ind, 0, cloned);
    setSpendingList(temp);
    const Total = calTotalExpenseFromSpendingList(temp);
    setExpense(Total);
  };

  const [showSideBar, setShowSideBar] = useState(false);
  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div className={"flex flex-row gap-2"}>
      <div
        className={cn(
          "flex flex-col  transition-width duration-500  gap-3 min-h-screen border-r-[1px] border-r-gray-100 shadow bg-gray-50 justify-between relative ",
          showSideBar ? "w-96" : "w-10",
        )}
      >
        {showSideBar && (
          <>
            <div className={"flex gap-3 flex-col py-10 px-5"}>
              <div>Add Expense</div>
              <div>
                <Input
                  id={"income"}
                  type="number"
                  value={income_val}
                  onChange={(ev) => {
                    setIncome_val(ev.target.value);
                  }}
                  placeholder="Income"
                  className=" text-right"
                />
              </div>
              <div>
                <label className="" htmlFor={"date"}>
                  Date
                </label>

                <Input
                  id={"date"}
                  type="date"
                  value={date}
                  onChange={(ev) => {
                    SetDate(ev.target.value);
                  }}
                  className=" mt-1 w-full"
                />
              </div>
              <div className={"my-5"}>
                <div className="flex justify-between">
                  <div
                    className={
                      "text-blue-500 hover:text-blue-600 font-semibold text-lg inline-flex items-center cursor-pointer "
                    }
                  >
                    Spending List
                  </div>
                </div>
                <div className={"mt-2"}>
                  <div className={"flex gap-1 flex-col"}>
                    {spendingList.map((product, index) => (
                      <div className="flex items-center gap-4" key={index}>
                        <div className={"w-2/3"}>
                          <Input
                            type="text"
                            value={product.item_name}
                            placeholder="Spend on item"
                            className="mt-1"
                            onChange={(ev) => {
                              handleSpendingItemNameChange(
                                ev.target.value,
                                index,
                              );
                            }}
                          />
                        </div>
                        <div>
                          <Input
                            type="number"
                            value={product.amount}
                            placeholder="Amount"
                            className="mt-1 text-right"
                            onChange={(ev) => {
                              handleSpendingItemAmountChange(
                                ev.target.value,
                                index,
                              );
                            }}
                          />
                        </div>
                        <div className={"flex gap-1"}>
                          <Copy
                            className={"w-4 h-4 text-blue-400 cursor-pointer "}
                            onClick={() => {
                              handleSpendingItemCopy(index);
                            }}
                          />
                          {spendingList.length > 1 && (
                            <XCircle
                              className={"w-4 h-4 text-red-400 cursor-pointer "}
                              onClick={() => {
                                handleSpendingItemRemove(index);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={"flex justify-between mt-2"}>
                    <div className="text-sm px-2 bg-green-100 text-lime-600 rounded-sm">
                      <span>Total: &nbsp;</span>
                      {expense}
                    </div>
                    <div
                      className={
                        "text-blue-500 hover:text-blue-600 font-semibold text-sm inline-flex items-center cursor-pointer  "
                      }
                      onClick={handleAddSpendingItem}
                    >
                      <span>
                        <Plus className={"w-4 h-4 "} />
                      </span>
                      Add more
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"relative border-t py-3"}>
              <div className={"flex space-x-2 w-full text-sm px-5 "}>
                {fId === null && (
                  <button
                    onClick={handleCreateExpense}
                    className="text-blue-600  border bg-blue-200 uppercase font-bold py-2 px-4 rounded items-center flex justify-center"
                  >
                    {/* Conditional Rendering */}
                    {isPerformingAnyAction ? (
                      <Loader2 className="animate-spin h-5 w-5 text-white" />
                    ) : (
                      "Save"
                    )}
                  </button>
                )}
                {fId !== null ? (
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
                ) : (
                  ""
                )}
                <button
                  onClick={resetAllFields}
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
          </>
        )}

        <Button
          size={"icon"}
          variant={"outline"}
          onClick={handleShowSideBar}
          className={cn(
            "absolute -right-5 bottom-1/2  ",
            !showSideBar ? "bg-primary" : "",
          )}
        >
          {showSideBar && (
            <ChevronLeft className={"text-gray-400 hover:text-gray-500"} />
          )}
          {!showSideBar && <Plus className={"text-white"} />}
        </Button>
      </div>
      <div
        className={cn(
          "flex flex-col  px-5 h-screen py-6 overflow-scroll",
          showSideBar ? "w-2/3" : "w-full",
        )}
      >
        <ExpenseList
          allExpenses={expenses}
          handleDelete={handleDelete}
          handleFetch={handleFetch}
          isPerformingAnyAction={isPerformingAnyAction}
        />
      </div>
    </div>
  );
}

export default Expense;
