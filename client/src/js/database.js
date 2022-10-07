import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  // connect to db
  const jateDb = await openDB("jate", 1);
  // create a new transaction
  const tx = jateDb.transaction("jate", "readwrite");
  // open up desired object store
  const store = tx.objectStore("jate");
  // put data in db
  const request = store.put({ id: 1, content: content });

  // get confirmation of request
  const result = await request;
  console.log("data saved", result);
};

export const getDb = async () => {
  console.log("get from db");
  // connect to db
  const jateDb = await openDB("jate", 1);
  // create a new transaction
  const tx = jateDb.transaction("jate", "readonly");
  // open up desired object store
  const store = tx.objectStore("jate");
  // get all data from db
  const request = store.get(1);

  // get confirmation of request
  const result = await request;
  return result.content;
};

initdb();
