import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
     return knex.schema.createTable('candidate_profile', table => {
          table.string('id').primary().notNullable()
          table.string('user_id').references('id').inTable('candidate').onDelete('cascade')
          table.string('name').notNullable()
          table.date('born_date').notNullable();
          table.string('phone').notNullable();
          table.text('description').notNullable();
          table.string('website')
          table.string('linkedin')
          table.string('github')
          table.timestamp('created_at').defaultTo(knex.fn.now())
          table.timestamp('updated_at').defaultTo(knex.fn.now())
     })
}


export async function down(knex: Knex): Promise<void> {
     return knex.schema.dropTable('candidate_profile');
}

