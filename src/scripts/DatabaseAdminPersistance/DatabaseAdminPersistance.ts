import { Result } from "../../lib/ResultGenerator";

export interface DatabaseAdminPersistance {
  create: () => Promise<Result>;
}
