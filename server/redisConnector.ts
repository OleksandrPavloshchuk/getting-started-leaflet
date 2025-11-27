import {createClient} from "redis";

let client = createClient({
    url: 'redis://redis:6379'
});
client.on('error', (err) => console.error('Redis Client Error', err));

export async function getOrCache(
    prefix: string,
    key: any,
    baseRetrieve: () => any,
    ttlSeconds = 3600
) {
    if (!client.isOpen) {
        await client.connect();
    }
    const keyStr = createKeyString(prefix, key);
    const valueStr = await client.get(keyStr);
    if (valueStr) {
        return JSON.parse(valueStr.toString());
    } else {
        const value = await baseRetrieve();
        await client.setEx(keyStr, ttlSeconds, JSON.stringify(value));
        return value;
    }

}

const createKeyString = (prefix: string, src) => `${prefix}:${JSON.stringify(src, Object.keys(src).sort())}`;