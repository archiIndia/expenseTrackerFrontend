use("expense");
db.getCollection("expenses").aggregate([

 
  {
    $match: {
      status: "A",
    },
  },
  {
    $project: {
      balance: 1,
      income: 1,
      itemList: 1,
      status: 1,
    },
  },
  {
    $addFields: {
      doubleBal: { $multiply: ["$balance", 2] },
    },
  },
  {
    $unwind: {
      path: "$itemList",
    },
  },
  {
    $group: {
      _id: "$itemList.item_name",
      total_expense: { $sum: "$itemList.amount" },
      item_name: { $first: "$itemList.item_name" },
    },
  },
  {
    $sort: {
      total_expense: -1,
    },
  },
  {
    $limit: 5,
  },
]);
