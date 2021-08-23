export const testGarbagesInput = [
  {
    location: {
      coordinates: [31, 34],
      type: "Point",
    },
    color: "Green",
    type: "Paper Only",
    emptyingDate: "2021-08-18T12:19:23.000Z",
  },
  {
    location: {
      coordinates: [4, 5],
      type: "Point",
    },
    color: "Blue",
    type: "Normal",
    emptyingDate: "2021-08-20T12:19:23.000Z",
  },
  {
    location: {
      coordinates: [2, 3],
      type: "Point",
    },
    color: "Green",
    type: "Paper Only",
    emptyingDate: "2021-08-22T12:19:23.000Z",
  },
];

export const testGarbages = testGarbagesInput.map((testInput) => {
  JSON.parse(JSON.stringify(testInput));
  testInput.id = testInput._id;
  delete testInput._id;
  return testInput;
});

export const notExistId = "611d1de714febd230c6d8777";
