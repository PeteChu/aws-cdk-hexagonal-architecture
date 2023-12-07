/* eslint-disable */

import { z, ZodError } from "zod";
import { BadRequestException } from "../exceptions/exceptions";
import { Err } from "../types/result";

export function ValidateInputSchema(schema: z.ZodObject<any, any, any, any>) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        schema.parse(args[0]);
        return originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof ZodError) {
          return Err(
            new BadRequestException(
              `Input validation failed: ${error.errors
                .map(
                  (err) =>
                    `property '${err.path}' is ${err.message.toLowerCase()}.`,
                )
                .join(", ")}`,
            ),
          );
        } else {
          throw error;
        }
      }
    };
  };
}
