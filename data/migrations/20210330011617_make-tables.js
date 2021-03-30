exports.up = function(knex) {
    return knex.schema

        .createTable("roles",table => {
            table.increments();
            table.string("name",128).notNullable().unique();
        })
    
        .createTable('users', users => {
            users.increments();
            users.string('username', 255).notNullable().unique().index();
            users.string('password', 255).notNullable();
            users
                .integer("role")
                .unsigned()
                .references("roles.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE")
                .defaultTo(2);
                
        });


};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("roles").dropTableIfExists("users");
};
