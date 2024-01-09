import { Options } from "swagger-jsdoc";
import { zodToJsonSchema } from "zod-to-json-schema";
import { AdsGeoJson, ReportApi } from "@admanager/shared";

import GeoJsonApiDoc from "./src/doc/GeoJsonApi.json" with {type:"json"};
import ReportApiDoc from "./src/doc/ReportApi.json" with {type:"json"};

const AdsGeoJsonSchemas = Object.entries(AdsGeoJson).reduce(
  (acc, value) => {
    acc[value[0]] = {
      ...zodToJsonSchema(value[1], {
        target: "openApi3",
      }),
    };
    return acc;
  },
  {} as { [key: string]: object }
);

const ReportJsonSchemas = Object.entries(ReportApi).reduce(
  (acc, value) => {
    acc[value[0]] = {
      ...zodToJsonSchema(value[1], {
        target: "openApi3",
      }),
    };
    return acc;
  },
  {} as { [key: string]: object }
);

const jsonSchema = {
  openapi: "3.1.0",
  components: {
    schemas: {
      ...AdsGeoJsonSchemas,
      ...ReportJsonSchemas,
    },
  },
};

const swaggerOptions: Options = {
  swaggerDefinition: {
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API documentation for Your Express App",
    },
    servers: [
      {
        url: "http://localhost:4030",
      },
    ],
    ...jsonSchema,
    paths: {
      ...GeoJsonApiDoc,
      ...ReportApiDoc,
    },
  },
  apis: ["./src/routes/**/*.ts"],
};

export { swaggerOptions };
