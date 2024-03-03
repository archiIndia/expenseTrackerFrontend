import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Switch } from "@/components/ui/switch.jsx";
import { Label } from "@/components/ui/label";
import { getTopExpenses } from "../Services/expenseControl";
import { useEffect, useState } from "react";

const TopExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [isMonthly,setIsMonthly]= useState(false);

  async function loadData() {
    try {
      const result = await getTopExpenses(isMonthly);
      setExpenses(result.top_expenses);
    } catch (error) {
      alert("Error");
    }
  }
  useEffect(() => {
    loadData();
  }, [isMonthly]);

  return (
    <div>
      <Card className={"h-full w-full"}>
        <CardHeader>
          <CardTitle className={"flex justify-between"}>
            <div> Top Expenses</div>
            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                checked={isMonthly}
                onCheckedChange={() => {
                  setIsMonthly((prev)=>!prev) //setIsMonthly(!isMonthly)
                }}
              />
              <Label htmlFor="airplane-mode">Month</Label>
            </div>
          </CardTitle>
          <CardDescription>this is your top expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={"flex flex-col gap-y-2"}>
            {expenses.map((ele, index) => (
              <div className={"flex justify-between"} key={index}>
                <p>{ele.item_name}</p>
                <p>₹{ele.total_expense}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default TopExpenses;
