import React from 'react';
import { useState } from 'react';
import * as G from './styled';
import { Item } from './types/Item';
import { ListItem } from './components/Listitem';
import { AddArea } from './components/AddArea';


const App = () => {
  const [list, setList] = useState<Item[]>([]);
  
  const handleAddTask = (taskName: string) => {
    let newList = [...list];
    newList.push({
      id: list.length + 1,
      name: taskName,
      done: false
    });
    setList(newList)
  }

  return (
    <G.Container>
      <G.Area>
        <G.Header>Lista de Tarefas</G.Header>
      
        {/* Area de adicionar nova tarefa */}
        <AddArea onEnter={handleAddTask} />

        {/* Lista das tarefas*/}
        {list.map((item, index)=> (
        <ListItem key={index} item={item} />
        ))}      
      </G.Area>
    </G.Container>
  );
}
 
export default App;
