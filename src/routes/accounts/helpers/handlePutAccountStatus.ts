import createAccountsDatabaseOnPool from "../../../database/DatabasePersistance/AccountsDatabasePersistance/__tests__/helpers/createAccountsDatabaseOnPool";
import { Request, Response } from "express";

export default async function handlePutAccountStatus(
  req: Request,
  res: Response,
  status: "activate" | "close" | "freeze"
) {
  const accountIDs: number[] = JSON.parse(req.body.accountIDs);
  try {
    const accountsDatabase = createAccountsDatabaseOnPool();
    const results = await accountsDatabase[status](accountIDs);

    if (!results.success) throw results.error;
    return res.json(results.data);
  } catch (e) {
    return res.status(404).json(e);
  }
}
