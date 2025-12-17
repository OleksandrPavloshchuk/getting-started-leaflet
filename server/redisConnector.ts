import {createClient} from "redis";

let client = createClient({
    url: 'redis://redis:6379'
});
client.on('error', (err) => console.error('Redis Client Error', err));

export async function evictWithFullKey(key: string) {
    ensureConnected()
        .then(() => client.del(key));
}

export async function getOrCacheWithPrefixAndKey<T>(
    prefix: string,
    key: any,
    baseRetrieve: () => any,
    ttlSeconds = 3600
): Promise<T> {
    return getOrCacheWithFullKey<T>(createKeyString(prefix, key), baseRetrieve, ttlSeconds);
}

export async function getOrCacheWithFullKey<T>(
    fullKey: string,
    baseRetrieve: () => any,
    ttlSeconds = 3600
): Promise<T> {
    return ensureConnected()
        .then(() => client.get(fullKey))
        .then((valueStr) => {
            if (valueStr) {
                return JSON.parse(valueStr.toString());
            }
            return baseRetrieve()
                .then((value: T) =>
                    client
                        .setEx(fullKey, ttlSeconds, JSON.stringify(value))
                        .then(() => value));
        });
}

const ensureConnected = async () => {
    if (!client.isOpen) {
        await client.connect();
    }
}

const createKeyString = (prefix: string, src) => `${prefix}:${JSON.stringify(src, Object.keys(src).sort())}`;