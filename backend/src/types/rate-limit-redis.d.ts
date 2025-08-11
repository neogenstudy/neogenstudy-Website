declare module 'rate-limit-redis' {
    interface RedisStoreOptions {
      client?: import('redis').RedisClientType;
      sendCommand?: (...args: string[]) => Promise<any>;
      prefix?: string;
    }
  
    class RedisStore {
      constructor(options: RedisStoreOptions);
    }
  
    export = RedisStore;
  }