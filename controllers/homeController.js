
const BigPromise = require("../middlewares/bigPromise")

exports.home = BigPromise(async(req, res) => {
    res.status(200).json({
      success: true,
      greeting: "hello from api",
    });
  });


exports.homedummy = async(req, res) => {
   
try {
    res.status(200).json({
        success: true,
        greeting: "hello from home dummy",
      });
} catch (error) {
    console.log(error);
}

  };
   