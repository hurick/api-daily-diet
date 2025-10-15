import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.timestamp('session_id').notNullable().unique()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users')
}
