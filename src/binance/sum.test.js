const sum =require('./sum')

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });


  test('another adds 1 + 2 to equal 3', () => {
    expect(sum(3, 2)).toBe(5);
  });