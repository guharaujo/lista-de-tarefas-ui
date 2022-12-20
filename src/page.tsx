import { useState } from "react";
import * as G from "./styled";
import { Task } from "./components/AddTask/index";
import { List } from "./components/ListItem/index";
import { Item } from "./types/Item";

export const Page = () => {
  const [tasks, setTasks] = useState<Item[]>([]);

  return (
    <G.Container>
      <G.Area>
        <G.Header> Lista de Tarefas </G.Header>
        <Task setTasks={setTasks}></Task>
        <List tasks={tasks}></List>
      </G.Area>
    </G.Container>
  );
};
