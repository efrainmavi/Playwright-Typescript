import { APIRequestContext, request } from "@playwright/test";
class ApiController {
  fakerApi: APIRequestContext;

  constructor() {
    this.fakerApi = null as unknown as APIRequestContext;
  }

  async requestContextInitialize() {
    this.fakerApi = await request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com",
    });
  }

  async getUsers() {
    const response = await this.fakerApi.get("/users");
    const responseBody = await response.json();
    return responseBody[0];
  }

  async createTodo() {
    const response = await this.fakerApi.post("/users/1/todos", {
      data: {
        title: "test todo learn playwright",
        completed: false,
      },
    });

    return response.json();
  }
}

export default new ApiController();
