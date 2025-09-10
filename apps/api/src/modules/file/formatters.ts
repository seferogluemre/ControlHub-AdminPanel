import type { File } from "@devflow/db/client";
import { BaseFormatter } from "../../utils";
import { fileResponseDto } from "./dtos";
import type { FileShowResponse } from "./types";

export abstract class FileFormatter {
  static response(data: File) {
    const convertedData = BaseFormatter.convertData<FileShowResponse>(
      { ...data, size: data.size.toString() },
      fileResponseDto,
    );
    return convertedData;
  }
}
