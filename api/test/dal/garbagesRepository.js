import chai from "chai";
import * as crud from "../../dal/garbagesRepository.js";
import { testGarbage, notExistId } from "../consts.js";

let expect = chai.expect;

describe("Garbage repository", function () {
  describe("Get by id garbage", function () {
    it("Get exist", async function () {
      const garbage = await crud.getById(testGarbage.id);
      expect(JSON.stringify(garbage)).to.equal(JSON.stringify(testGarbage));
    });
    it("Get not exist", async function () {
      const garbage = await crud.getById(notExistId);
      expect(garbage).to.deep.equal(null);
    });
  });
});
