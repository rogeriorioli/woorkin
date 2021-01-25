import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('apply_job', table => {
    table.uuid('id').primary()
    table.string('job_id').references('id').inTable('job_offer').onDelete('cascade')
    table.string('candidate_id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

}


export async function down(knex: Knex): Promise<void> {
}

