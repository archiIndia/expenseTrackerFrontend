import { Trash2, PenLine, Loader2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import axios from "axios";
import { Button } from "./components/ui/button";
import { useLocation, useNavigate } from "react-router";

function ExpenseList({
  allExpenses = [],
  isPerformingAnyAction,
  handleDelete,
  handleFetch,
}) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const navi = useNavigate();
  
  const handlePrevNext = (action) => {
    try {
      const currentPage = params.get("page");
      const nextPage = parseInt(currentPage) + (action === "next" ? 1 : -1);
      if (nextPage < 1) return;
      params.set("page", nextPage);
      const newSearch = params.toString();
      // console.log(params.entries());
      navi(`/app/expenses?${newSearch}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className={"flex justify-between "}>
        <span>Expense List</span>
        <div>
          <Button
            onClick={() => {
              handlePrevNext("prev");
            }}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              handlePrevNext("next");
            }}
          >
            Next
          </Button>
        </div>
      </div>
      <div className={"grid grid-cols-1 xl:grid-cols-2 mt-4 gap-2"}>
        {allExpenses.map((exp, index) => (
          <div
            key={index}
            className="flex flex-row  w-full rounded shadow-md p-6 border hover:bg-amber-300 hover:bg-opacity-50 cursor-pointer"
          >
            <div className={"flex w-full justify-between"}>
              <div>
                <div className={"flex flex-col"}>
                  <span
                    className={
                      "text-xs w-fit mb-2 bg-emerald-200 p-1 rounded text-emerald-700"
                    }
                  >
                    {moment(exp.date).format("DD-MM-YYYY")}
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
                        exp.expenseTotal > 5000
                          ? "text-red-500 rounded bg-red-200 px-1"
                          : ""
                      } `}
                    >
                      {exp.expenseTotal}
                    </span>
                  </div>
                  <div className={"flex flex-col ml-5"}>
                    <span className={"text-xs"}>Balance</span>
                    <span className={"text-md text-right"}>{exp.balance}</span>
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
  );
}

export { ExpenseList, FileUpload };

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (ev) => {
    setSelectedFile(ev.target.files[0]);
    console.log(ev.target.files);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("File1", selectedFile);
      // formData.append("File2", JSON.stringify({abx:"10"}));

      try {
        const response = await axios.post(
          "http://localhost:5005/uploads",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        console.log("File Uploaded Sucessfully:", response.data);
      } catch (error) {
        console.log("Error in File Uploading", error);
      }
    } else {
      alert("Please Select a File to Upload");
    }
  };

  return (
    <div>
      <div>File Upload</div>
      <div>
        <input type="file" onChange={handleFileChange} multiple={true} />
        <button
          onClick={handleUpload}
          className="flex flex-wrap bg-sky-400 rounded-md"
        >
          Upload
        </button>
      </div>
    </div>
  );
};
