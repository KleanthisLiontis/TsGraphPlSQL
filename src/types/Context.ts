import { DataSource } from "typeorm"

export type Context = {
    dbconn: DataSource;
}