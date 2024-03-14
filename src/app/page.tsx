"use client";

import { ContactTable } from "@/components/contact-table";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { database } from "@/service/firebase";
import { onValue, push, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface TypeSubmit {
  name: string;
  email: string;
  telephone: string;
}

export type FirebaseData = [string, TypeSubmit];

export default function Home() {
  const [data, setData] = useState<FirebaseData[]>([]);
  const [idByUpdate, setIdByUpdate] = useState("");
  const [updateState, setUpdateState] = useState(false);

  const methods = useForm<TypeSubmit>();

  const refDoc = ref(database, "contatos");

  function submit({ name, email, telephone }: TypeSubmit) {
    const dataPush = push(refDoc);
    set(dataPush, { name, email, telephone });
    clearData();
  }

  function readData() {
    onValue(refDoc, (snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val() as TypeSubmit[]);
        return setData(data);
      }
      setData([]);
    });
  }

  function editData(ctt: FirebaseData) {
    const { setValue } = methods;
    const dataCtt = ctt[1];
    setValue("name", dataCtt.name);
    setValue("email", dataCtt.email);
    setValue("telephone", dataCtt.telephone);
    setUpdateState(true);
  }

  function updateData({ name, email, telephone }: TypeSubmit) {
    const refUpdate = ref(database, `contatos/${idByUpdate}`);
    update(refUpdate, { name, email, telephone });
    clearData();
    setUpdateState(false)
  }

  function deleteData(id: string) {
    const refDelete = ref(database, `contatos/${id}`);
    remove(refDelete);
  }

  function clearData() {
    const { setValue } = methods;
    setValue("name", "");
    setValue("email", "");
    setValue("telephone", "");
  }

  useEffect(() => {
    readData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen px-8">
      <div className="grid grid-cols-2 h-3/5 border-cyan-400 border rounded-md min-w-full">
        <div className="bg-white p-4 flex items-center justify-center rounded-md ">
          <FormProvider {...methods}>
            <form>
              <div className="text-center ">
                <h1 className="text-4xl text-cyan-500 font-extrabold">
                  Crud Web
                </h1>
                <p className="text-[#FDA20B] font-medium">Firebase Database</p>
              </div>
              <Input
                // label="Nome"
                name="name"
                type="text"
                placeholder="Nome"
              />
              <Input
                // label="Email"
                name="email"
                type="email"
                placeholder="Email"
              />
              <Input
                // label="Telefone"
                name="telephone"
                type="tel"
                placeholder="Telefone"
              />
              <div className="flex justify-center mt-6">
                {updateState ? (
                  <Button
                    onClick={methods.handleSubmit(updateData)}
                    className="bg-cyan-600 px-12"
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    onClick={methods.handleSubmit(submit)}
                    className="bg-cyan-600 px-12"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>

        <ContactTable
          className="bg-cyan-300 p-4 rounded-r-md overflow-auto"
          data={data}
          onDelete={(idCtt) => deleteData(idCtt)}
          onEdit={(infoCtt) => editData(infoCtt)}
          onSetById={(idCtt) => setIdByUpdate(idCtt)}
        />
      </div>
    </div>
  );
}
