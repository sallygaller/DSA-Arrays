const Memory = require("./memory.js");
const memory = new Memory();

class Array {
  constructor() {
    // Array starts with a length of 0 and pointer to - blocks of memory
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  // Push a value - O(n)
  push(value) {
    // Allocate more space than you need, so you need to resize less. Each time you go over capacity, you resize according to the SIZE_RATIO.
    // In best and average cases for pushing, you won't need to resize, so these are O(1).
    // In worst case, you still need to resize.
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  // Retrieve a value - O(1)
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    // Add an index offset and get the value stored at a memory address
    return memory.get(this.ptr + index);
  }

  // Pop a value - O(1)
  pop() {
    if (this.length == 0) {
      throw new Error("Index error");
    }
    // Rather than resize the array, just leave an empty space which will be filled in the next push:
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  // Insert a value - O(n)
  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    // Shift all values after the new value back one position.
    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    // Put the new value in its correct place
    memory.set(this.ptr + index, value);
    this.length++;
  }

  // Removing a value - O(n)
  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    // coping the values backward to fill the space where you removed the value
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }

  _resize(size) {
    // Allocate a new, larger chunk of memory, copy any existing values from the old chunk to the new chunk, and free the old chunk.
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error("Out of memory");
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }
}

module.exports = Array;
