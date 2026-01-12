import { Redis as UpstashRedis } from '@upstash/redis'
import IORedis from 'ioredis'

// Unified Redis interface for both local and production
interface RedisClient {
  get(key: string): Promise<string | null>
  set(key: string, value: string, options?: { ex?: number }): Promise<string | null>
}

// Local Redis client using ioredis
class LocalRedisClient implements RedisClient {
  private client: IORedis

  constructor() {
    this.client = new IORedis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      retryStrategy: () => null, // Don't retry, fail fast
      lazyConnect: true, // Don't connect immediately
      maxRetriesPerRequest: 1,
    })

    // Handle connection errors gracefully
    this.client.on('error', (err) => {
      console.error('❌ Local Redis connection failed:', err.message)
      console.error('💡 Set USE_LOCAL_REDIS=false in .env.local to use Upstash instead')
    })
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key)
    } catch (error) {
      console.error('Redis GET error:', error)
      return null
    }
  }

  async set(key: string, value: string, options?: { ex?: number }): Promise<string | null> {
    try {
      if (options?.ex) {
        return await this.client.set(key, value, 'EX', options.ex)
      }
      return await this.client.set(key, value)
    } catch (error) {
      console.error('Redis SET error:', error)
      return null
    }
  }
}

// Upstash Redis client (production)
class UpstashRedisClient implements RedisClient {
  private client: UpstashRedis

  constructor() {
    this.client = new UpstashRedis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key)
  }

  async set(key: string, value: string, options?: { ex?: number }): Promise<string | null> {
    if (options?.ex) {
      return this.client.set(key, value, { ex: options.ex })
    }
    return this.client.set(key, value)
  }
}

// Create the appropriate client based on environment
function createRedisClient(): RedisClient {
  const useLocal = process.env.USE_LOCAL_REDIS === 'true'
  
  if (useLocal) {
    console.log('🔴 Using LOCAL Redis (localhost:6379)')
    return new LocalRedisClient()
  } else {
    console.log('☁️ Using UPSTASH Redis (production)')
    return new UpstashRedisClient()
  }
}

// Singleton export
export const redis = createRedisClient()
