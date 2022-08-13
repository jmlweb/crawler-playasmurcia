const extractChunks = <T>(items: ReadonlyArray<T>, perChunk: number): ReadonlyArray<T>[] =>
  Array.from({ length: Math.ceil(items.length / perChunk) }, (_, index) =>
    items.slice(index * perChunk, index * perChunk + perChunk),
  );

export default extractChunks;
