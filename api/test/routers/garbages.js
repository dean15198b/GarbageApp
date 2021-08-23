import { GARBAGE_TYPES, GARBAGE_COLORS } from "../../consts.js";
import { testGarbages, notExistId } from "../consts.js";
import { getOneGarbage } from "../helpers.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { app } from "../../app.js";
import chaiAsPromised from "chai-as-promised";
import {
  getGarbageColors,
  getGarbageTypes,
  getByEmptyingDates,
  getById,
  updateById,
  deleteById,
  create,
} from "../../controllers/garbages.js";
import { response } from "express";

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();

describe("Garbages API", () => {
  describe("Get garbage colors", function () {
    it("Get", async function () {
      const response = await chai.request(app).get("/api/garbages/colors");
      expect(response.body).to.deep.equal(GARBAGE_COLORS);
      expect(response.status).to.deep.equal(200);
    });
  });
  describe("Get garbage types", function () {
    it("Get", async function () {
      const response = await chai.request(app).get("/api/garbages/types");
      expect(response.body).to.deep.equal(GARBAGE_TYPES);
      expect(response.status).to.deep.equal(200);
    });
  });
  describe("Get garbage by id", function () {
    it("Get exist", async function () {
      const existGarbage = await getOneGarbage();
      const response = await chai
        .request(app)
        .get(`/api/garbages/${existGarbage.id}`);
      expect(JSON.stringify(response.body)).to.equal(
        JSON.stringify(existGarbage)
      );
      expect(response.status).to.deep.equal(200);
    });
    it("Get not exist", async function () {
      const response = await chai
        .request(app)
        .get(`/api/garbages/6123655766263966bc208888`);
      expect(JSON.stringify(response.body)).to.equal(JSON.stringify({}));
      expect(response.status).to.deep.equal(404);
    });
  });
  describe("Get garbages by emptying dates ", function () {
    it("Get all", async function () {
      const response = await chai.request(app).get(`/api/garbages`);
      const garbages = response.body.map((gar) => {
        delete gar.id;
        return gar;
      });
      expect(JSON.stringify(garbages)).to.equal(JSON.stringify(testGarbages));
      expect(response.status).to.deep.equal(200);
    });
    it("Get all by from", async function () {
      const response = await chai
        .request(app)
        .get(`/api/garbages`)
        .query({ minEmptyingDate: "2021-08-19T12:19:23.000Z" });

      const garbages = response.body.map((gar) => {
        delete gar.id;
        return gar;
      });
      expect(JSON.stringify(garbages)).to.equal(
        JSON.stringify(testGarbages.slice(1, 3))
      );
      expect(response.status).to.deep.equal(200);
    });
    it("Get all by until", async function () {
      const response = await chai
        .request(app)
        .get(`/api/garbages`)
        .query({ maxEmptyingDate: "2021-08-21T12:19:23.000Z" });
      const garbages = response.body.map((gar) => {
        delete gar.id;
        return gar;
      });
      expect(JSON.stringify(garbages)).to.equal(
        JSON.stringify(testGarbages.slice(0, 2))
      );
      expect(response.status).to.deep.equal(200);
    });
    it("Get all by until and from", async function () {
      const response = await chai.request(app).get(`/api/garbages`).query({
        minEmptyingDate: "2021-08-19T12:19:23.000Z",
        maxEmptyingDate: "2021-08-21T12:19:23.000Z",
      });
      const garbages = response.body.map((gar) => {
        delete gar.id;
        return gar;
      });
      expect(JSON.stringify(garbages)).to.equal(
        JSON.stringify(testGarbages.slice(1, 2))
      );
      expect(response.status).to.deep.equal(200);
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
      const response = await chai
        .request(app)
        .post(`/api/garbages`)
        .send(input);
      const garbage = response.body;
      delete garbage.id;

      expect(JSON.stringify(input)).to.equal(JSON.stringify(garbage));
      expect(
        (await getByEmptyingDates()).filter((gar) => {
          delete gar.id;
          return JSON.stringify(gar) === JSON.stringify(input);
        })
      ).to.not.be.empty;
      expect(response.status).to.deep.equal(201);
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
      const response = await chai
        .request(app)
        .patch(`/api/garbages/${garbageId}`)
        .send({
          location: newLocation,
          emptyingDate: newEmptyingDate,
        });
      existGarbage.location = newLocation;
      existGarbage.emptyingDate = newEmptyingDate;

      const foundGarbage = await getById(garbageId);
      expect(JSON.stringify(response.body)).to.equal(
        JSON.stringify(existGarbage)
      );
      expect(JSON.stringify(foundGarbage)).to.equal(
        JSON.stringify(existGarbage)
      );
      expect(response.status).to.deep.equal(201);
    });
    it("update not exist", async function () {
      const garbageId = "611d1de714febd230c6d1111";
      const newLocation = {
        coordinates: [6, 7],
        type: "Point",
      };
      const newEmptyingDate = "2021-08-01T12:19:23.000Z";
      const response = await chai
        .request(app)
        .patch(`/api/garbages/${garbageId}`)
        .send({
          location: newLocation,
          emptyingDate: newEmptyingDate,
        });
      expect(response.body).to.deep.equal({});
      expect(response.status).to.deep.equal(404);
    });
  });
  describe("Delete garbage", function () {
    it("Delete exist", async function () {
      const existGarbage = await getOneGarbage();
      const garbageId = existGarbage.id;
      const response = await chai
        .request(app)
        .delete(`/api/garbages/${garbageId}`);
      const garbage = response.body;
      delete garbage.id;
      const foundGarbage = await getById(garbageId);
      expect(JSON.stringify(garbage)).to.equal(JSON.stringify(testGarbages[0]));
      expect(foundGarbage).be.null;
      expect(response.status).to.deep.equal(201);
    });
    it("Delete not exist", async function () {
      const response = await chai
        .request(app)
        .delete(`/api/garbages/611d1de714febd230c6d1111`);
      expect(response.status).to.deep.equal(404);
      expect(response.body).to.deep.equal({});
    });
  });
});
