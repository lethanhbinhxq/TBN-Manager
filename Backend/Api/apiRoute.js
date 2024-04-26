const router = require("express").Router();
const fs = require("fs");
let a1 = 0;
let a2 = "";
let a3 = "";
let a4 = "";
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(description, totalEffort) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `${description}. Split the description above to tasks,which each task in format json() and the tasks is the array of object JSON() not include anything else  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const prompt1 = `Add effort time (effort) to each task in this ${text}, must equal or approximately equal to the ${totalEffort}`;
  const result1 = await model.generateContent(prompt1);
  const response1 = await result1.response;
  const text1 = response1.text();
  return text1;
}
const decisionTree = (customerIn, TechReq) => {
  decision = "";
  if (customerIn == "Yes") {
    decision = "Agile";
    return decision;
  } else if (customerIn == "No") {
    if (TechReq == "low") {
      decision = "Waterfall";
      return decision;
    } else if (TechReq == "medium") {
      decision = "Incremental";
      return decision;
    } else {
      decision = "high";
      return decision;
    }
  }
};
const tasks = [
  { task: "Feature A", effort: 20 },
  { task: "Feature B", effort: 15 },
  { task: "Feature C", effort: 30 },
  { task: "Feature D", effort: 25 },
  { task: "Feature E", effort: 10 },
];
const tasks10 = [
  { task: "Feature A", effort: 20 },
  { task: "Feature B", effort: 15 },
  { task: "Feature C", effort: 30 },
  { task: "Feature D", effort: 25 },
  { task: "Feature E", effort: 10 },
];
const tasks20 = [
  { task: "Feature A", effort: 20 },
  { task: "Feature B", effort: 15 },
  { task: "Feature C", effort: 30 },
  { task: "Feature D", effort: 25 },
  { task: "Feature E", effort: 10 },
];
const agile = (totalEffort, tasks, velocity) => {
  const sprints = Math.ceil(totalEffort / velocity);
  // console.log(sprints);

  const sprintTasks = [];
  for (let i = 0; i < sprints; i++) {
    sprintTasks.push([]);
  }

  tasks.sort((a, b) => b.effort - a.effort);

  while (tasks.length > 0) {
    const task = tasks.shift();
    let found = false;

    for (let i = 0; i < sprints; i++) {
      if (
        sprintTasks[i].reduce((acc, cur) => acc + cur.effort, 0) +
          task.effort <=
        velocity
      ) {
        sprintTasks[i].push({
          ...task,
          time: Math.round(task.effort / velocity),
        });
        found = true;
        break;
      }
    }

    if (!found) {
      throw new Error("Unable to schedule tasks within the given constraints.");
    }
  }

  return sprintTasks;
};
const incremental = (tasks, increments, velocity) => {
  const incrementTasks = [];
  for (let i = 0; i < increments; i++) {
    incrementTasks.push([]);
  }

  tasks.sort((a, b) => b.effort - a.effort);

  while (tasks.length > 0) {
    const task = tasks.shift();
    let found = false;

    for (let i = 0; i < increments; i++) {
      if (
        incrementTasks[i].reduce((acc, cur) => acc + cur.effort, 0) +
          task.effort <=
        velocity
      ) {
        incrementTasks[i].push({
          ...task,
          time: Math.round(task.effort / velocity),
        });
        found = true;
        break;
      }
    }

    if (!found) {
      throw new Error("Unable to schedule tasks within the given constraints.");
    }
  }

  return incrementTasks;
};
const waterfall = (tasks, phases, velocity) => {
  const phaseTasks = [];
  for (let i = 0; i < phases; i++) {
    phaseTasks.push([]);
  }

  tasks.sort((a, b) => b.effort - a.effort);

  let currentPhase = 0;
  // console.log(phaseTasks);
  // console.log(tasks);
  while (tasks.length > 0) {
    const task = tasks.shift();
    if (
      phaseTasks[currentPhase].reduce((acc, cur) => acc + cur.effort, 0) +
        task.effort <=
      velocity
    ) {
      phaseTasks[currentPhase].push({
        ...task,
        time: Math.round(task.effort / velocity),
      });
    } else {
      phaseTasks[currentPhase].push({
        ...task,
        time: Math.round(task.effort / velocity),
      });
      currentPhase++;
    }
  }

  return phaseTasks;
};
// Define tasks and dependencies

router.post("/", async (req, res) => {
  const { total, description, customerIn, TechReq } = req.body;
  a1 = total;
  a2 = description;
  a3 = customerIn;
  a4 = TechReq;
  try {
    if (req.body) res.status(200).json({ message: "Successfully post" });
  } catch (error) {
    res.status(401).json({ message: "Something wrong here" });
  }
});
router.get("/result", async (req, res) => {
  let task = await run(a2, a1);
  let type = decisionTree(a3, a4);
  console.log(task);
  let closing = task.lastIndexOf("```");
  let de0 = task.substring(task.indexOf("["), closing);
  let fre = [];
  let de = JSON.parse(de0);
  if (type == "Agile") {
    fre = agile(a1, de, a1 - 10);
  } else if (type == "Incremental") {
    fre = incremental(de, a1 / 4, a1 - 10);
  } else {
    fre = waterfall(de, a1 / 4, a1 - 10);
  }
  try {
    res.status(200).json({ type: type, plan: fre });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Something wrong" });
  }
});
module.exports = router;
