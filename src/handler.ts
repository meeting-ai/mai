import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { process } from "./nlp";

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message:
          "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
        input: event
      },
      null,
      2
    )
  };
};

export const ask: APIGatewayProxyHandler = async (event, _context) => {
  const response = await process(event.queryStringParameters["question"]);
  return {
    statusCode: 200,
    body: JSON.stringify({
      response
    })
  };
};
