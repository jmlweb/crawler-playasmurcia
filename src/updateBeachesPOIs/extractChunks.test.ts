import extractChunks from './extractChunks';

describe('extractChunks', () => {
  test('must work when there are more items than the limit', () => {
    const src = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = extractChunks(src, 4);
    expect(result).toEqual([
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9],
    ]);
  });
  test('must work when there are less items than the limit', () => {
    const src = [0, 1];
    const result = extractChunks(src, 4);
    expect(result).toEqual([[0, 1]]);
  });
});
