import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import * as G from "./styles";
import { Item } from "../../types/Item";

export const List = () => {
  const [lista, setListas] = useState<Item[]>([]);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const GetData = useCallback(async () => {
    const { data } = await axios.get<Item[]>("http://localhost:8000/api/index");
    setListas(data);
  }, []);

  useEffect(() => {
    GetData();
  }, []);

  const Delete = (id: number) => {
    axios.delete(`http://localhost:8000/api/destroy/${id}`);
    setListas(lista.filter((lista) => lista.id !== id));
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Edit = (item: Item) => {
    axios.put(
      `http://localhost:8000/api/update/?id=${item.id}&name=${item.tasklist}`
    );
  };

  return (
    <>
      {lista.map((val) => (
        <G.Container>
          <Input
            type="text"
            id="listTasks"
          
            disabled={isEditDisabled}
            value={val.tasklist}
            onChange={({ target: { value } }) => {
              setListas((prevObj) => {
                prevObj.map((v) => {
                  if (v.id === val.id) {
                    v.tasklist = value;
                  }
                });
                return { ...prevObj };
              });
            }}
          ></Input>
          {isEditDisabled ? (
            <Button type="primary" onClick={() => setIsEditDisabled(false)}>
              {" "}
              📝{" "}
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                Edit(val);
                setIsEditDisabled(true);
              }}
            >
              {" "}
              +{" "}
            </Button>
          )}
          <Button type="primary" onClick={showModal} >
            ❌{" "}
          </Button>
          
          <Modal
            title="Deseja excluir?"
            open={isModalOpen}
            onOk={() => Delete(val.id) }
            onCancel={handleCancel}
          >
            
          </Modal>
        </G.Container>
      ))}
    </>
  );
};
