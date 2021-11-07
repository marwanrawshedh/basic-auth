const { server } = require("../src/server"); // destructing assignment
const supertest = require("supertest");
const mockRequest = supertest(server);
const { db } = require("../src/auth/models/index");
beforeAll(async () => {
  await db.sync();
});

// after all the tests are done
afterAll(async () => {
  await db.drop();
});

describe("Web server", () => {
  it("POST to /signup to create a new user", async () => {
    const response = await mockRequest.post("/sign-up").send({
      username: "ahmad",
      password: "333333",
    });

    expect(response.status).toBe(201);
  });
  it("POST to /signin to login as a user (use basic auth)", async () => {
    const response = await mockRequest.post("/sign-up").send({
      username: "ahmad",
      password: "333333",
    });
    
    
        const response2 = await mockRequest.post("/sign-in").auth('ahmad', '333333')
       
        
    
        expect(response2.status).toBe(200);
    
  });

});
