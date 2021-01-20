
import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('logo_corp', table => {
          table.uuid('id').primary()
          table.string('user_id').references('id').inTable('recruiter').onDelete('cascade')
          table.string('logo_url').notNullable();
          table.timestamp('created_at').defaultTo(knex.fn.now())
          table.timestamp('updated_at').defaultTo(knex.fn.now()) 
      })
}
export async function down(knex: Knex): Promise<void> {
        return knex.schema.dropTable('logo_corp');

}
