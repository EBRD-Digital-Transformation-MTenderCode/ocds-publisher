import { spreadObject as sut } from './spread-object';

describe('spreadObject', () => {
  it('Should map selected keys from target object to new object', async () => {
    const oldObject = {
      key1: 'value1',
      key2: {
        copied: true,
      },
    };

    expect(await sut(oldObject, ['key1', 'key2'])).toStrictEqual({
      key1: 'value1',
      key2: {
        copied: true,
      },
    });
  });

  it('Should map and rename selected keys from target object', async () => {
    const oldObject = {
      key1: 'value1',
      key2: 'value2',
      key3: 'renameMe',
    };

    expect(
      await sut(oldObject, [
        ['key1', 'key1r'],
        ['key2', 'key2r'],
        ['key3', 'key3r'],
      ])
    ).toStrictEqual({
      key1r: 'value1',
      key2r: 'value2',
      key3r: 'renameMe',
    });
  });

  it('Should skip unspecified keys', async () => {
    const oldObject = {
      key1: 'value1',
      key2: 'value2',
      key3: 'renameMe',
    };

    expect(
      await sut(oldObject, [
        ['key1', 'key1r'],
        ['key3', 'key3r'],
      ])
    ).toStrictEqual({
      key1r: 'value1',
      key3r: 'renameMe',
    });
  });

  it('Should throw when specified key is not present in a target object', () => {
    const oldObject = {
      key1: 'value1',
    };

    // @ts-expect-error
    expect(sut(oldObject, ['key1', 'key2'])).rejects.toEqual(expect.any(ReferenceError));
  });
});
