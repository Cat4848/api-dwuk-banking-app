export default class IDGenerator {
    static smallIntRandomID() {
        const randomID = Math.floor(Math.random() * 32000);
        return randomID;
    }
}
