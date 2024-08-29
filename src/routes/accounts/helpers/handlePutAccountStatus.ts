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
    const freezeResults = await accountsDatabase[status](accountIDs);

    if (!freezeResults.success) throw freezeResults.error;
    return res.json(freezeResults.data);
  } catch (e) {
    return res.status(404).json(e);
  }
}
