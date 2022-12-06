const router = require("express").Router()
const todoSchema = require("../models/todoModel");
const { v4 } = require('uuid');

// routes will be here....
router.get("/todos", async (req, res) => {
  try{const allTodo = await todoSchema.find();
  res.status(200).json({
    status: true,
    msg: 'Fetched all todos',
    data: allTodo
  })}catch(error){
    res.status(500).json({
      status:false,
      msg:'Server Error',
      error:error.message
    })
  }
})
router
  .post("/todo", (req, res) => {
    const { description } = req.body; 
    console.log(req.body)
    const newTodo = new todoSchema({
      id: v4(),
      description: description,
      status: 'created'

    });

    // save the todo
    newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!");
        res.status(200).json({
          status:true,
          msg:"To Do added successfully",
          data:description
        })
      })
      .catch((err) => console.log(err));
  })

  .delete("/todo/:_id/delete", (req, res) => {
    const { id } = req.params;
    todoSchema.deleteOne({ id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.status(200).json({
          status: true,
          msg: `Deleted todo with id: ${id}`,
          
        })
      })
      .catch((err) => console.log(err));
  });

router.get("/todos/:_id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTodo = await todoSchema.find(id);
    res.status(200).json({
      status: true,
      msg: 'Fetched todo with id',
      data: allTodo
    })
  } catch (error) {
    res.status(500).json({
      status:false,
      msg:'Server Error',
      error:error.message
    })
  }
})
router
  .post("/todo/:_id/done", (req, res) => {
    const { id } = req.params
    todoSchema.findOneAndUpdate({ id: id }, { status: "done"}
    ).then((data)=>{
      console.log(data);
      res.status(200).json({
        status:true,
        msg:'To Do marked as done.',
        data:data
      })

    }).catch(error=>{
      res.status(500).json({
        status:false,
        msg:'Server Error',
        error:error.message
      })
    })

  })


module.exports = router;