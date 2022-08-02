import { Pool } from "pg";

const connectionString = "postgres://mckiferl:wEb8E-Y4wgjqqvrXo5ShSakC5LHRSond@kesavan.db.elephantsql.com/mckiferl";
const db = new Pool({ connectionString });

export default db;