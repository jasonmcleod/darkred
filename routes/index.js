
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
      foo:'foo!'
  });
};

exports.partials = function (req, res) {
  var name = req.params.name;
  console.log(name)
  res.render('partials/' + name);
};