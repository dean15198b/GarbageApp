import { handleFoundGarbageById } from "../../controllers/tools.js";
import GarbageNotFoundByIdError from "../../exceptions/garbageNotFound.js";
import chai from "chai";
let expect = chai.expect;

describe("Garbage controllers tools", function () {
  describe("Handle found garbage", function () {
    it("Handle exist", async function () {
      handleFoundGarbageById({ id: "test" }, "test_id");
    });
    it("Handle not exist", async function () {
      expect(() => handleFoundGarbageById(null, "test_id")).to.throw(
        GarbageNotFoundByIdError
      );
    });
  });
});
