import {createClient} from "redis";

let client = createClient({
    url: 'redis://redis:6379'
});
client.on('error', (err) => console.error('Redis Client Error', err));

export async function evictWithFullKey(key: string) {
    await client.del(key);
}

export async function getOrCacheWithPrefixAndKey(
    prefix: string,
    key: any,
    baseRetrieve: () => any,
    ttlSeconds = 3600
) {
    return getOrCacheWithFullKey(createKeyString(prefix, key), baseRetrieve, ttlSeconds);
}

export async function getOrCacheWithFullKey(
    fullKey: string,
    baseRetrieve: () => any,
    ttlSeconds = 3600
) {
    if (!client.isOpen) {
        await client.connect();
    }
    const valueStr = await client.get(fullKey);
    if (valueStr) {
        return JSON.parse(valueStr.toString());
    } else {
        const value = await baseRetrieve();
        await client.setEx(fullKey, ttlSeconds, JSON.stringify(value));
        return value;
    }

}

const createKeyString = (prefix: string, src) => `${prefix}:${JSON.stringify(src, Object.keys(src).sort())}`;