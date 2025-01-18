import { YoozORM } from "./lib.js";

const yoozJS = new YoozORM();

const addUser = yoozJS.changeData(
  { action: "create" },
  { email: "example@gmail.com", address: "iran" },
  { group: "users", field: "myaddress", layer: 3 }
);
console.log(addUser); 

const deleteUser = yoozJS.changeData(
  { action: "delete" },
  { email: "example@gmail.com", address: "iran", age: "23"},
  { group: "users", condition: { id: 1232 }, layer: 1 }
);

console.log(deleteUser); 

const findUser = yoozJS.findData(
    { number: "090000000000", address: "iran" },
    { group: "users", condition: { id: 1232 }, layer: 1 }
);
console.log(findUser); 

const updateUser = yoozJS.changeData(
  { action: "update" },
  { email: "example@gmail.com", job: "developer" },
  { group: "users", field: "myaddress", condition: { id: 1232 }, layer: 12 }
);
console.log(updateUser); 