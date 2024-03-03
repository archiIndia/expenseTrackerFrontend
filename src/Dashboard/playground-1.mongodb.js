use("expense");
db.getCollection("expenses").aggregate([
  //1st Stage
  {
    $sort: {
      balance: 1,
    },
  },
  //2nd Stage
  {
    $project: {
      userId: 0,
      __v: 0,
      itemList:{_id:0},
      date:0,
    },
  },
  {
    $match: {
      status: "A"
    }
  },
  {
    $limit: 5
  },
  {
    $addFields: {
        doubleBal:{$multiply:["$balance",2]}
    }
  }
]);
