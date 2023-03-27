
import express from 'express';

import * as usersData from "../controllers/userController"
import { connection } from '../controllers/userController';
import {IUser} from '../models/IUser'

export const routes = express()


routes.get('/', async(req, res) => {

  const sql_query =   'select * from user '

   connection.query(sql_query, (err, result:IUser[]) => {
    if(err) throw err
    console.log(err)
    console.log("this is userList:", result)
    res.send(result)
})
  //  res.sendStatus(400);
})

routes.get("/:id", async (req, res) => {
  const id =  req.params.id
 
  await connection.execute('SELECT * FROM user WHERE id = ?', [id], (err:string, rows:IUser[]) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
})


routes.post("/",  async(req,res) =>{
  const newUser: IUser =  {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    comments: req.body.comments,
    status: req.body.status
}
    await usersData.create(newUser)
 res.sendStatus(201)
})


routes.put('/:id', async(req, res) => {
  const uppdatedUser = await usersData.update(req.params.id, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    comments: req.body.comments,
    status: req.body.status
  })
res.send(uppdatedUser)

})


routes.delete("/:id", async (req, res ) => {
  const id =   req.params.id
  const sql = `DELETE FROM user WHERE id = ? `;
    connection.query(sql, [id], function (err, result) {
    if (err) throw err;
    console.log("this is err mesage:",err);
   
     res.send( result)
    console.log("this is the user we deleted:", result)
  });

})


routes.get("/search/:searchParam" , async(req, res) =>{
  const searchParam = req.params.searchParam;
  
  const sql_query = ` SELECT * FROM user WHRE fist_name LIKE %`


})
