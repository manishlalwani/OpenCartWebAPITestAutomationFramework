
import fs from "fs";
import { parse } from 'csv-parse/sync';

export class CsvHelper {

    static readCsv(filepath: string): Record<string, string>[] {
        return parse(fs.readFileSync(filepath, 'utf-8'), {
            columns: true, //first row as headers
            skip_empty_lines: true,
            trim: true
        }) as Record<string, string>[];
    }

}

export class CsvHelper1 {

    static readCsv(filePath:string): Record<string, string>[] {

       

        return parse(fs.readFileSync(filePath, 'utf-8') , {

            columns : true, //consider first row as header

            skip_empty_lines : true,

            trim : true,

        }) as Record<string, string>[];

       

    }

}