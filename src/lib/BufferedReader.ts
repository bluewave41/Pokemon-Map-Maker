export default class BufferedReader {
  buffer: Buffer;
  index: number;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
    this.index = 0;
  }
  readByte() {
    return this.buffer.readUInt8(this.index++);
  }
  readString() {
    const length = this.buffer.readUInt16LE(this.index);
    this.index += 2;
    const str = this.buffer.subarray(this.index, this.index + length);
    this.index += length;
    return str.toString();
  }
}
