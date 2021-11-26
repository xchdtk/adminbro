const User = require("../models/User");
const LRU = require("lru-cache");

const options = {
  max: 500,
  maxAge: 1000 * 60 * 60,
  length(n, key) {
    return 1;
  },
  dispose(key, n) {
    /* 데이터가 삭제된 후 호출 */
  },
};

const cache = new LRU(options);

module.exports.get_user = async(req, res, next) => {
  const users = await User.find();
  try {
    const cache_users = cache.get("getUsers");
    if (cache_users) {
      console.log("데이터가 생겼네여?")
      res.status(200).json(JSON.parse(cache_users));
      return
    }
    console.log("데이터가 없어여ㅠㅠ")
    cache.set("getUsers", JSON.stringify(users));
    res.status(200).json(users)
  } catch (err) {
    console.log(err)
    next(err);
  }
};
