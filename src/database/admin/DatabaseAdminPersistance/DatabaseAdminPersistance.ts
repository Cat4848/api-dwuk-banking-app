import { Result } from "../../../lib/ResultGenerator/ResultGenerator";

export interface DatabaseAdminPersistance {
  create: () => Promise<Result>;
}
