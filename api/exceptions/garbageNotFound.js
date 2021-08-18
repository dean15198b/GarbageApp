class GarbageNotFoundByIdError extends Error {
  constructor(garbageId) {
    super(`The garbage with the id: ${garbageId} was not found`);
    this.name = "GarbageNotFoundByIdError";
  }
}

export default GarbageNotFoundByIdError;
