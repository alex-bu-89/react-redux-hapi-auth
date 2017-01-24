const tableName = 'users';

/**
 * UP
 */
exports.up = (Knex, Promise) => {
  // Create ToDo's list table
  return Knex.schema.createTable(tableName, (table) => {
    // Define table fields
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();

    // Standards
    table.timestamps();
    table.charset('utf8');
  });
};


/**
 * DOWN
 */
exports.down = (Knex, Promise) => {
  return Knex.schema.dropTable(tableName);
};
