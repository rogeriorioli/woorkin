import * as Knex from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable('candidate', table => {
        table.string('id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('username').notNullable();
        table.string('user_type').notNullable();
        table.date('first_session')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('candidate');
}

