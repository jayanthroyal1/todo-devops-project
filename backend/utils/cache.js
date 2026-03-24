const redis = require("../config/redis");

const getCacheKey = (userId, query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status = "",
    sort = "createdAt",
  } = query;

  return `todo:${userId}:${page}:${limit}:${search}:${status}:${sort}`;
};

const clearCache = async (userId) => {
  const keys = await redis.keys(`todo:${userId}`);
  if (keys.lenght > 0) {
    await redis.del(keys);
  }
};

module.exports = { getCacheKey, clearCache };
