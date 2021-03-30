const bcrypt = require("bcryptjs");
const password = "cheese";
const hash = bcrypt.hashSync(password, 8);

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
        {
            username: "test", 
            password: '1234',
            email: 'test@test.com'
        },
        
        {
            username: "test2", 
            password: hash,
            email: 'test2@test.com'
        },

        ]);
      });
  };