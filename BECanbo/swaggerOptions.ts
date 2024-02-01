import { Options } from "swagger-jsdoc";
import { zodToJsonSchema } from "zod-to-json-schema";
import { AdsGeoJson, ReportApi,PlaceChangeApi, WardApi, DistrictApi, AdsMethodApi,AuthApi,AdChangeApi, AdsReqApi } from "@admanager/shared";
import GeoJsonApiDoc from "./src/doc/GeoJsonApi.json" with {type:"json"};
import ReportApiDoc from "./src/doc/ReportApi.json" with {type:"json"};
import PlaceChangeApiDoc from "./src/doc/PlaceChangeRoute.json" with {type:"json"};
import WardApiDoc from "./src/doc/WardApi.json" with {type:"json"};
import DistrictApiDoc from "./src/doc/DistrictApi.json" with {type:"json"};
import UserApiDoc from "./src/doc/UserApi.json" with {type:"json"};
import AdsMethodApiDoc from "./src/doc/AdsMethodApi.json" with {type:"json"};
import AdsChangeApiDoc from "./src/doc/AdsChangeApi.json" with {type:"json"};
import AdsReqApiDoc from "./src/doc/AdsReqApi.json" with {type:"json"};
import AuthApiDoc from "./src/doc/AuthApiDoc.json" with {type:"json"};

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

const PlaceEditReqSchemas = Object.entries(PlaceChangeApi).reduce(
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

const WardSchema = Object.entries(WardApi).reduce(
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

const DistrictSchema = Object.entries(DistrictApi).reduce(
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

const AdsChangeSchema = Object.entries(AdChangeApi).reduce(
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
const UserSchema = Object.entries(AuthApi).reduce(
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
// hohooho
const AdsReqSchema = Object.entries(AdsReqApi).reduce(
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
const AdsMethodSchema = Object.entries(AdsMethodApi).reduce(
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
    securitySchemes:{
      bearerAuth:{
        type:"http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      ...AdsGeoJsonSchemas,
      ...ReportJsonSchemas,
      ...PlaceEditReqSchemas,
      ...WardSchema,
      ...DistrictSchema,
      ...AdsChangeSchema,
      ...AdsReqSchema,
      ...UserSchema,
      ...AdsMethodSchema,
    },
  },
};

const swaggerOptions: Options = {
  swaggerDefinition: {
    info: {
      title: "City Ads Manager APIs",
      version: "1.0.0",
      description: "API documentation for City Ads Manager Website",
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
      ...PlaceChangeApiDoc,
      ...WardApiDoc,
      ...DistrictApiDoc,
      ...AdsChangeApiDoc,
      ...AdsReqApiDoc,
      ...UserApiDoc,
      ...AdsMethodApiDoc,
      ...AuthApiDoc
    },
  },
  apis: ["./src/routes/**/*.ts"],
};

export { swaggerOptions };
