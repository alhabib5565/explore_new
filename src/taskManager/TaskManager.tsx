import { DragEvent, useState } from "react";
import { motion } from "framer-motion";
import { FaFire, FaTrashCan } from "react-icons/fa6";

type TTask = {
  title: string;
  id: string;
  status: string;
};

type TColumn = {
  status: string;
  headingColor: string;
  title: string;
  tasks: TTask[];
  setTask: React.Dispatch<React.SetStateAction<TTask[]>>;
};

type TDeleteProps = Pick<TColumn, "setTask" | "tasks">;
type TAddTaskPros = Pick<TColumn, "setTask" | "tasks" | "status">;

const onDragStart = (event: DragEvent<HTMLElement>, task: TTask) => {
  event.dataTransfer.setData("TaskId", task.id);
};

const TaskManager = () => {
  return (
    <div className="min-h-screen w-full pt-10 px-10 h-full bg-neutral-800 text-neutral-50">
      <AllColumns />
    </div>
  );
};

const AllColumns = () => {
  const [tasks, setTasks] = useState(default_tasks);
  return (
    <div className="flex justify-between gap-4 ">
      <SingleColumn
        tasks={tasks}
        setTask={setTasks}
        title="Backlog"
        status="backlog"
        headingColor="text-neutral-500"
      />
      <SingleColumn
        tasks={tasks}
        setTask={setTasks}
        title="Pending"
        status="pending"
        headingColor="text-yellow-200"
      />
      <SingleColumn
        tasks={tasks}
        setTask={setTasks}
        title="Running"
        status="running"
        headingColor="text-blue-400"
      />
      <SingleColumn
        tasks={tasks}
        setTask={setTasks}
        title="Done"
        status="done"
        headingColor="text-emerald-200"
      />
      <DeleteCard tasks={tasks} setTask={setTasks} />
    </div>
  );
};

const SingleColumn = ({
  headingColor,
  tasks,
  title,
  status,
  setTask,
}: TColumn) => {
  const [active, setActive] = useState(false);

  const onDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setActive(true);
  };

  const onDragLeave = () => {
    setActive(false);
  };

  const onDragEnd = (event: DragEvent<HTMLElement>) => {
    const dragableElementId = event.dataTransfer.getData("TaskId");
    const allTasks = [...tasks];
    const dragableElement = allTasks.find(
      (task) => task.id === dragableElementId
    );
    dragableElement!.status = status;

    setTask(allTasks);
    setActive(false);
  };

  const filteredTask = tasks.filter((task) => task.status === status);
  return (
    <div className=" w-full">
      <div className="flex justify-between items-center p-3 rounded-md bg-neutral-700/40 border-2 border-neutral-500">
        <h2 className={`text-2xl font-bold capitalize ${headingColor}`}>
          {title}
        </h2>
        <p className="text-sm text-neutral-400">{filteredTask.length}</p>
      </div>
      <motion.div
        // layout
        onDragOver={(e) => onDragOver(e)}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDragEnd(e)}
        className={`mt-2 space-y-4 min-h-[calc(100vh-110px)] ${
          active && "bg-neutral-500/10 "
        }`}
      >
        {filteredTask.map((task) => (
          <Card {...task} key={task.id} />
        ))}
        <AddTask tasks={tasks} setTask={setTask} status={status} />
      </motion.div>
    </div>
  );
};

const Card = ({ title, id, status }: TTask) => {
  return (
    <motion.div layout>
      <div
        onDragStart={(e) => onDragStart(e, { id, title, status })}
        draggable={true}
        className="p-3 rounded-md border border-neutral-400 bg-neutral-600/50 cursor-grab active:cursor-grabbing active:scale-95 duration-200"
      >
        <p className="text-sm">{title}</p>
      </div>
    </motion.div>
  );
};

const AddTask = ({ status, tasks, setTask }: TAddTaskPros) => {
  const [inputShow, setInputShow] = useState(false);
  const [text, setText] = useState("");
  const handleInputShow = () => {
    setInputShow(!inputShow);
  };

  const handleAddTask = () => {
    if (!text) {
      return alert("Please write");
    }
    const task = [
      ...tasks,
      {
        id: Math.floor((Math.random() + 20) * 1000).toString(),
        status: status,
        title: text,
      },
    ];
    setTask(task);
    setInputShow(false);
  };
  return (
    <div>
      {inputShow ? (
        <motion.div layout>
          <textarea
            autoFocus
            onChange={(e) => setText(e.target.value)}
            placeholder="Add Task..."
            className="w-full rounded border-2 border-violet-800/50 focus:border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="flex justify-end items-center gap-4">
            <button
              onClick={handleInputShow}
              className="text-neutral-400 hover:text-neutral-200"
            >
              Close
            </button>
            <button
              onClick={handleAddTask}
              className="px-2 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-all text-neutral-600"
            >
              Add +
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          layout
          onClick={handleInputShow}
          className="text-neutral-400 hover:text-neutral-200"
        >
          Add Task +
        </motion.button>
      )}
    </div>
  );
};

const DeleteCard = ({ tasks, setTask }: TDeleteProps) => {
  const [active, setActive] = useState(false);
  const onDragEnd = (event: DragEvent<HTMLElement>) => {
    const deleteTaskId = event.dataTransfer.getData("TaskId");
    const remaingingTasks = tasks.filter((task) => task.id !== deleteTaskId);
    setTask(remaingingTasks);
    setActive(false);
  };

  const onDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setActive(true);
  };
  const onDragLeave = () => {
    setActive(false);
  };

  return (
    <div
      onDrop={(e) => onDragEnd(e)}
      onDragOver={(e) => onDragOver(e)}
      onDragLeave={onDragLeave}
      className={` grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FaTrashCan />}
    </div>
  );
};

export default TaskManager;

const default_tasks = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", status: "backlog" },
  { title: "SOX compliance checklist", id: "2", status: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", status: "backlog" },
  { title: "Document Notifications service", id: "4", status: "backlog" },
  // Pending
  {
    title: "Research DB options for new microservice",
    id: "5",
    status: "pending",
  },
  { title: "Postmortem for outage", id: "6", status: "pending" },
  { title: "Sync with product on Q3 roadmap", id: "7", status: "pending" },

  // Running
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    status: "running",
  },
  { title: "Add logging to daily CRON", id: "9", status: "running" },
  // Done
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    status: "done",
  },
];
