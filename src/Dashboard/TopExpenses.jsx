import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Switch } from "@/components/ui/switch.jsx";
import { Label } from "@/components/ui/label";

const TopExpenses = () => {
  return (
    <div>
      <Card className={"h-full w-full"}>
        <CardHeader>
          <CardTitle className={"flex justify-between"}>
           <div> Top Expenses</div>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Month</Label>
            </div>
          </CardTitle>
          <CardDescription>this is your top expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-between"}>
              <p>Food</p>
              <p>₹100</p>
            </div>
            <div className={"flex justify-between"}>
              <p>Transport</p>
              <p>₹50</p>
            </div>
            <div className={"flex justify-between"}>
              <p>Entertainment</p>
              <p>₹30</p>
            </div>
            <div className={"flex justify-between"}>
              <p>Health</p>
              <p>₹20</p>
            </div>
            <div className={"flex justify-between"}>
              <p>Education</p>
              <p>₹10</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default TopExpenses;
