var _ = require('underscore')

_.mixin({
  chance : function(n) {
    return Math.random()*100 > n
  },
  between:function(n1,n2) {
      return ~~(Math.random() * n2) + n1
  }
});