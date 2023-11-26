export default class BufferedWriter {
  buffer: Buffer;
  index: number;

  constructor() {
    this.buffer = Buffer.alloc(30000);
    this.index = 0;
  }
  writeByte(b: number) {
    this.buffer.writeUInt8(b, this.index++);
  }
  writeBuffer(buffer: Buffer) {
    for (const b of buffer) {
      this.writeByte(b);
    }
  }
  writeString(str: string) {
    this.buffer.writeUInt16LE(str.length, this.index);
    this.index += 2;
    this.writeBuffer(Buffer.from(str));
  }
  getBuffer() {
    return this.buffer.subarray(0, this.index);
  }
}
