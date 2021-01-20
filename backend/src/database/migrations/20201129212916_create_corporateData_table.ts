import * as Knex from "knex";


export async function up(knex: Knex) {
      return knex.schema.createTable('corp_data', table => {
        table.string('id').primary().notNullable()
        table.string('user_id').references('id').inTable('recruiter').onDelete('cascade')
        table.string('name_company').notNullable()
        table.text('description_company').notNullable()
        table.string('logo_company').notNullable()
        table.string('site_company').notNullable()
        table.string('linked_in').nullable()
        table.string('adress_company').nullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

    });
}


export async function down(knex: Knex) {
   return knex.schema.dropTable('corp_data');
}

