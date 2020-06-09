type Lookup<V = unknown> = Record<string, V>;
type Key<O extends Lookup> = keyof O;
type Value<O extends Lookup> = O[Key<O>];
type Entries<O extends Lookup> = readonly [string, Value<O>];

const checkMissingKey = <O extends Lookup>(object: O, key: keyof O): void => {
  if (!Object.prototype.hasOwnProperty.call(object, key)) {
    throw new ReferenceError(`Specified key '${key}' is missing from target object.`);
  }
};

export const spreadObject = async <O extends Lookup>(
  object: O,
  keys: Array<Key<O> | [Key<O>, string]>
): Promise<Lookup<Value<O>>> => {
  return Promise.resolve(
    Object.fromEntries(
      await Promise.all(
        keys.map<Promise<Entries<O>>>((key) => {
          return new Promise<Entries<O>>((resolve) => {
            if (Array.isArray(key)) {
              checkMissingKey(object, key[0]);

              return resolve([key[1], object[key[0]]]);
            }

            checkMissingKey(object, key);

            return resolve([key as string, object[key]]);
          });
        })
      )
    )
  );
};
