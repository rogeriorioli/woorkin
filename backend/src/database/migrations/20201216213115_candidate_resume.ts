import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
         return knex.schema.createTable('candidate_resume', table => {
          table.uuid('id').primary()
          table.string('user_id').references('id').inTable('candidate').onDelete('cascade')
          table.text('title').nullable()
          table.text('resume').notNullable()
          table.specificType('skills', 'character varying(200)[]').notNullable()
          table.timestamp('created_at').defaultTo(knex.fn.now())
          table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
}


export async function down(knex: Knex): Promise<void> {
      return knex.schema.dropTable('candidate_resume');
}

