const user = require('../models').users;

module.exports = {
  create(req, res) // to create user table
  {
    return user.create(
      {
        id:req.body.id,
        userName: req.body.userName,
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        toWhomPersonName: req.body.toWhomPersonName,
        age: req.body.age,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) // to display all users from table
  {
    return user
    .findAll()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
  },
  update(req, res) // to update data from table
  {        
    const id = req.params.id;        
    user.update({ contactNumber: req.body.contactNumber,toWhomPersonName: req.body.toWhomPersonName },            
      { 
        where: { id: req.params.id}
      })
      .then(() => 
      {            
        res.status(200).send("Updated successfully user Detail with id = " + id);       
      })   
  },
  destroy(req, res) // to delete data from users
  {          
    user.destroy(
    {          
      where :{id:req.params.id}          
    })          
    .then(() => res.status(200).send("Deleted successfully user"))         
    .catch(error => res.status(400).send(error));            
  }, 
};