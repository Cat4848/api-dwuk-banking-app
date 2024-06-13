export default class IDGenerator {
  public static smallIntRandomID(): number {
    const randomID = Math.floor(Math.random() * 32000);
    return randomID;
  }
}
