import { Handler } from "express";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const minuteTransport = new DailyRotateFile({
  filename: "./logs/%DATE%/application-%DATE%.log",
  frequency: "1m",
  datePattern: "YYYY-MM-DD-HH-mm",
});

const logger = createLogger({
  format: format.combine(format.json()),
  transports: [minuteTransport],
});

export const LogMiddleware: Handler = function (req, res, next) {
  const oldSend = res.send;
  res.send = function () {
    const logObject = {
      method: req.method,
      url: req.originalUrl,
      status_code: res.statusCode,
    };
    logger.info(logObject);
    return oldSend.apply(res, arguments as any);
  };
  next();
};
