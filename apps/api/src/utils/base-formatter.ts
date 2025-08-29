import { Value } from "@sinclair/typebox/value";

export abstract class BaseFormatter {
  static convertData<ReturnType extends object>(data: any, dto: any) {
    const clonedData = { ...data };
    const cleanData = Value.Clean(dto, clonedData) as any;

    return cleanData as ReturnType;
  }
}
