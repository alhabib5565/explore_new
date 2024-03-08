import { DragEvent, useState } from "react";

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

const onDragStart = (event: DragEvent<HTMLElement>, task: TTask) => {
  event.dataTransfer.setData("Task", task.id);
};

const TaskManager = () => {
  return (
    <div className="min-h-screen w-full h-full bg-neutral-800 text-neutral-50">
      <AllColumns />
    </div>
  );
};

const AllColumns = () => {
  const [tasks, setTasks] = useState(default_tasks);
  return (
    <div className="flex justify-between gap-4 lg:gap-8">
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

const SingleColumn = ({ headingColor, tasks, title, status }: TColumn) => {
  const filteredTask = tasks.filter((task) => task.status === status);
  return (
    <div className=" w-full">
      <div className="flex justify-between items-center p-3 rounded-md bg-neutral-700 border-2 border-neutral-500">
        <h2 className={`text-2xl font-bold capitalize ${headingColor}`}>
          {title}
        </h2>
        <p className="text-sm text-neutral-400">{filteredTask.length}</p>
      </div>
      <div className="mt-2 space-y-4">
        {filteredTask.map((task) => (
          <Card {...task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ title, id, status }: TTask) => {
  return (
    <div
      onDragStart={(e) => onDragStart(e, { id, title, status })}
      draggable={true}
      className="p-3 rounded-md border border-neutral-400 cursor-grab active:cursor-grabbing active:scale-95 duration-200"
    >
      <p className="text-sm">{title}</p>
    </div>
  );
};

const DeleteCard = ({ tasks, setTask }: TDeleteProps) => {
  const [active, setActive] = useState(false);
  const onDragEnd = (event: DragEvent<HTMLElement>) => {
    console.log(event, "sdfsfs");
    const deleteTaskId = event.dataTransfer.getData("Task");
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
      className={`h-[200px] w-full bg-neutral-700/70 border rounded-md ${
        active ? "border-red-600 bg-red-500/15 text-red-600" : ""
      }`}
    ></div>
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
