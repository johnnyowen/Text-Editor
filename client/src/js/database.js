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

export const putDb = async (id, content) => {
  // opens our database called jate, version 1
  const jateDb = await openDB("jate", 1);
  // starts a transaction on the jate database with ability to read and write data
  const txt = jateDb.transaction("jate", "readwrite");
  // this is where our data will be stored
  const store = txt.objectStore("jate");
  // creates a put requestwithin the object's transaction store
  const request = store.put({ id: id, content: content });
  // if the request is successful, the updated data is stored in the result variable
  const result = await request;
};

export const getDb = async () => {
  // opens our database called jate, version 1
  const indexedDb = await openDB("jate", 1);
  // starts a transaction on the jate database with ability to read data
  const txt = indexedDb.transaction("jate", "readonly");
  // this is where our data will be stored
  const store = txt.objectStore("jate");
  // creates a get request to get the data with the key 1 from the object store
  const request = store.get(1);
  // if the request is successful, the data is returned in the result variable
  const result = await request;
  // returns the value of result if there is data, if there is no data, null or undefined is returned
  return result?.value;
};

initdb();
