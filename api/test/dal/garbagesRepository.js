import chai from "chai";
import { testGarbages, notExistId } from "../consts.js";
import { getOneGarbage } from "../helpers.js";
import {
  create,
  deleteByIdIfExist,
  getByEmptyingDates,
  getById,
  updateByIdIfExist,
} from "../../dal/garbagesRepository.js";

let expect = chai.expect;

describe("Garbage repository", function () {
  describe("Get garbage by id", function () {
    it("Get exist", async function () {
      const existGarbage = await getOneGarbage();
      const foundGarbage = await getById(existGarbage.id);
      expect(JSON.stringify(foundGarbage)).to.equal(
        JSON.stringify(existGarbage)
      );
    });
    it("Get not exist", async function () {
      const garbage = await getById(notExistId);
      expect(garbage).to.equal(null);
    });
  });
  describe("Get garbages by emptying dates ", function () {
    it("Get all", async function () {
      const garbages = (await getByEmptyingDates()).map((gar) => {
        delete gar.id;
        return gar;
      });
      expect(JSON.stringify(garbages)).to.equal(JSON.stringify(testGarbages));
    });
    it("Get all by from", async function () {
      const garbages = (
        await getByEmptyingDates("2021-08-19T12:19:23.000Z", null)
      ).map((gar) => {
        delete gar.id;
        return gar;
      });
      expect(JSON.stringify(garbages)).to.equal(
        JSON.stringify(testGarbages.slice(1, 3))
      );
    });
    it("Get all by until", async function () {
      const garbages = (
        await getByEmptyingDates(null, "2021-08-21T12:19:23.000Z")
      ).map((gar) => {
        delete gar.id;
        return gar;
      });
      expect(JSON.stringify(garbages)).to.equal(
        JSON.stringify(testGarbages.slice(0, 2))
      );
    });
    it("Get all by until and from", async function () {
      const garbages = (
        await getByEmptyingDates(
          "2021-08-19T12:19:23.000Z",
          "2021-08-21T12:19:23.000Z"
        )
      ).map((gar) => {
        delete gar.id;
        return gar;
      });
      expect(JSON.stringify(garbages)).to.equal(
        JSON.stringify(testGarbages.slice(1, 2))
      );
    });
  });
  describe("Create garbage", function () {
    it("Create", async function () {
      const input = {
        location: {
          coordinates: [4, 5],
          type: "Point",
        },
        color: "Blue",
        type: "Normal",
        emptyingDate: "2021-08-27T12:19:23.000Z",
      };
      const garbage = await create(input);
      delete garbage.id;

      expect(JSON.stringify(input)).to.equal(JSON.stringify(garbage));
      expect(
        (await getByEmptyingDates()).filter((gar) => {
          delete gar.id;
          return JSON.stringify(gar) === JSON.stringify(input);
        })
      ).to.not.be.empty;
    });
  });
  describe("Update garbage", function () {
    it("update exist", async function () {
      const existGarbage = await getOneGarbage();
      const garbageId = existGarbage.id;
      const newLocation = {
        coordinates: [6, 7],
        type: "Point",
      };
      const newEmptyingDate = "2021-08-01T12:19:23.000Z";
      const garbageResponse = await updateByIdIfExist(garbageId, {
        location: newLocation,
        emptyingDate: newEmptyingDate,
      });
      existGarbage.location = newLocation;
      existGarbage.emptyingDate = newEmptyingDate;

      const foundGarbage = await getById(garbageId);
      expect(JSON.stringify(garbageResponse)).to.equal(
        JSON.stringify(existGarbage)
      );
      expect(JSON.stringify(foundGarbage)).to.equal(
        JSON.stringify(existGarbage)
      );
    });
    it("update not exist", async function () {
      const garbageId = "611d1de714febd230c6d1111";
      const newLocation = {
        coordinates: [6, 7],
        type: "Point",
      };
      const newEmptyingDate = "2021-08-01T12:19:23.000Z";
      const shouldGarbage = null;
      const garbage = await updateByIdIfExist(garbageId, {
        location: newLocation,
        emptyingDate: newEmptyingDate,
      });
      expect(JSON.stringify(garbage)).to.equal(JSON.stringify(shouldGarbage));
    });
  });
  describe("Delete garbage", function () {
    it("Delete exist", async function () {
      const existGarbage = await getOneGarbage();
      const garbageId = existGarbage.id;
      const garbage = await deleteByIdIfExist(garbageId);
      delete garbage.id;
      const foundGarbage = await getById(garbageId);
      expect(JSON.stringify(garbage)).to.equal(JSON.stringify(testGarbages[0]));
      expect(foundGarbage).be.null;
    });
    it("Delete not exist", async function () {
      const garbage = await deleteByIdIfExist("611d1de714febd230c6d1111");
      expect(garbage).be.null;
    });
  });
});
