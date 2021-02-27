import Request from "./Request";
import { execSync } from "child_process";

const executeCmd = (cmd) => {
  try {
    execSync(cmd, { env: process.env });
  } catch (e) {}
};

beforeAll((done) => {
  executeCmd("yarn sequelize db:drop");
  executeCmd("yarn sequelize db:create");
  executeCmd("yarn sequelize db:migrate");
  done();
});

const tests = () => {
  let shortenUrl = "";

  it("encurta url", async (done) => {
    await Request.post("/encurtador")
      .send({ url: "https://github.com/natanaelsimoes" })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("newUrl");
        shortenUrl = res.body.newUrl;
      });
    done();
  });

  it("url inválida", async (done) => {
    await Request.post("/encurtador").send({ url: "urlinvalida" }).expect(400);
    done();
  });

  it("redirecionamento", async (done) => {
    const hash = shortenUrl.split('/').pop();
    await Request.get(`/${hash}`)
      .expect(302)
      .then((res) => {
        console.log(res);
      });
    done();
  });

  it("hash não encontrado", async (done) => {
    await Request.get(`/hashimpossivel`).expect(404);
    done();
  });
};

describe("URL", tests);
