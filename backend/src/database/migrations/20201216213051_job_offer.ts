import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('job_offer', table => {
        table.string('id').primary()
        table.string('user_id').references('id').inTable('recruiter').onDelete('cascade')
        table.text('title').nullable()
        table.decimal('number_offers').notNullable()
        table.string('locale').notNullable()
        table.string('type_contract').notNullable()
        table.text('job_description').notNullable()
        table.specificType('tags', 'character varying(200)[]').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('job_offer');
}

