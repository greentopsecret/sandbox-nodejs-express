import serverless from "serverless-http";
import express, { Response as ExResponse, Request as ExRequest, json, urlencoded } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../.build/routes";

export const app = express();

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../.build/swagger.json"))
  );
});

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

RegisterRoutes(app);

export const handler = serverless(app);