type Lookup<V = unknown> = Record<string, V>;
type Key<O extends Lookup> = keyof O;
type Value<O extends Lookup> = O[Key<O>];
type Entries<O extends Lookup> = readonly [string, Value<O>];

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
              return resolve([key[1], object[key[0]]]);
            }

            return resolve([key as string, object[key]]);
          });
        })
      )
    )
  );
};
