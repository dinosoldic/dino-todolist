import express from "express";
import { createClient } from "@supabase/supabase-js";

const TasksRoutes = express.Router();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET tasks
TasksRoutes.get("/get-tasks", async (_req, res) => {
  try {
    const { data, error } = await supabase.from("todolist_tasks").select("*");

    if (error) throw new Error("Error fetching data."); // Set caching and send data
    res.set("Cache-control", "public, max-age=3600");
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Error fetching data." });
  }
});

// POST add tasks
TasksRoutes.post("/add-task", async (req, res) => {
  try {
    const taskname: string = req.body.taskname;

    // define new task and upload
    const { error: addError } = await supabase.from("todolist_tasks").insert({
      name: taskname,
    });

    if (addError) throw new Error("Error adding task.");

    res.status(200).json("Task added successfully");
  } catch {
    res.status(500).json({ error: "An error occurred while adding task." });
  }
});

// POST update tasks
TasksRoutes.post("/update-task", async (req, res) => {
  try {
    const taskname = req.body.taskname;
    const taskid = req.body.taskid;

    // define new task and upload
    const { error: updateError } = await supabase
      .from("todolist_tasks")
      .update({
        name: taskname,
      })
      .eq("id", taskid);

    if (updateError) throw new Error("Error updating task.");

    res.status(200).json("Task updated successfully");
  } catch {
    res.status(500).json({ error: "An error occurred while updating task." });
  }
});

// POST update check tasks
TasksRoutes.post("/update-check-tasks", async (req, res) => {
  try {
    const tasks: { id: string; isCompleted: boolean }[] = req.body;

    // define new task and upload
    for (const task of tasks) {
      const id = parseInt(task.id, 10);
      const completedDate = task.isCompleted ? new Date() : null;
      const { error: updateError } = await supabase
        .from("todolist_tasks")
        .update({
          completed: completedDate,
          iscompleted: task.isCompleted,
        })
        .eq("id", id);

      if (updateError) throw new Error("Error checking task.");
    }
    res.status(200).json("Tasks checked successfully");
  } catch {
    res.status(500).json({ error: "An error occurred while checking task." });
  }
});

// DELETE tasks
TasksRoutes.delete("/delete-tasks", async (req, res) => {
  try {
    const taskIDs: string[] = req.body.ids;

    // define new task and upload
    for (const taskID of taskIDs) {
      const id = parseInt(taskID, 10);
      const { error: deleteError } = await supabase
        .from("todolist_tasks")
        .delete()
        .eq("id", id);

      if (deleteError) throw new Error("Error deleting task.");
    }
    res.status(200).json("Tasks deleted successfully");
  } catch {
    res.status(500).json({ error: "An error occurred while deleting task." });
  }
});

export default TasksRoutes;
