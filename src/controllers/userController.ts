import mysql from 'mysql2'
import { IUser } from '../models/IUser'

require('dotenv').config()
const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
}
export const connection = mysql.createConnection(config)
//* Upprätter en anslutning.
connection.connect()

export const create = async (user: IUser) => {
  const { first_name, last_name, email, phone, comments, status } = user
  const sql_query = ` INSERT INTO user(first_name,last_name, email, phone, comments, status)  VALUES(?,?,?,?,?,?)`

  //* Skapar en query med prepared statements.
  connection.execute(
    sql_query,
    [first_name, last_name, email, phone, comments, status],
    (error, result: IUser[]) => {
      if (error) {
        console.log(error)
      } else {
        console.log(result)
        return result
      }
    },
  )
}


export const getAll =  async() => {

    const sql = `SELECT * FROM user`
  
  let data =  await connection.execute(sql)
     
    return data.rows;
   
  }
  



export const findById = (id: string) => {
  const parsedId = parseInt(id)
  const sql_query = ` SELECT * from user WHERE id = ?`
  connection.execute(sql_query, [parsedId], (err:string, result:IUser[]) => {
    if (err) throw err
    console.log(err)
    console.log(result)
    return result
  })
}

export const update = async (id: string, user: IUser) => {
  const parsedId = parseInt(id)
  const { first_name, last_name, email, phone, comments, status } = user

  // User the connection
  connection.execute(
    'UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?, status = ? WHERE id = ?',
    [first_name, last_name, email, phone, comments, status, parsedId],
    (err: string, rows: IUser[]) => {
      if (!err) {
        //! User the connection
        connection.query(
          'SELECT * FROM user WHERE id = ?',
          [parsedId],
          (err, rows) => {
            //! When done with the connection, release it

            if (!err) {
            } else {
              console.log(err)
            }
            console.log('The data from user table: \n', rows)
          },
        )
      } else {
        console.log(err)
      }
      console.log('The data from user table: \n', rows)
    },
  )
}

export const deleteById = (id: string) => {
  const parsedId = parseInt(id)

  const sql_query = `DELETE FROM user WHERE id = ? `

   connection.execute(sql_query, [parsedId], (err: string, result: IUser[]) => {
  if (err) throw err
  console.log(err)
  return result
})

}
