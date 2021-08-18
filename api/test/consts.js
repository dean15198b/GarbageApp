export const testGarbageInput = {
  _id: "611d1de714febd230c6d84b9",
  location: {
    coordinates: [2, 3],
    type: "Point",
  },
  color: "Green",
  type: "Normal",
  emptyingDate: "2021-08-18T12:19:23.000Z",
};

export const testGarbage = JSON.parse(JSON.stringify(testGarbageInput));
testGarbage.id = testGarbage._id;
delete testGarbage._id;

export const notExistId = "611d1de714febd230c6d8777";
