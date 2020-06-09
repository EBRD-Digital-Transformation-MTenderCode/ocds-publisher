import { spreadObject as sut } from './spread-object';

describe('spreadObject', () => {
  it('Should map selected keys from old object to new', async () => {
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

  it('Should map and rename selected keys from old object to new', async () => {
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
});
