var create_accounts_table = new Migration({
  up: function() {
        this.create_table('characters', function(t) {
          t.integer('id');
          t.string('name');
          t.integer('account_id');
          t.string('xp');
          t.primary_key('id');
        });
  },
  down: function() {
  }
});