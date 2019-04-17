const manager = require('../models').managers;

module.exports = {
  create(req, res) // to create manager table
  {
    return manager.create(
      {
        id:req.body.id,
        managerName: req.body.managerName,
        phoneNumber: req.body.phoneNumber,
        isActive: req.body.isActive,
        isOrganisingEvent: req.body.isOrganisingEvent,
      })
      .then(manager => res.status(201).send(manager))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) // to display all managers from table
  {
    return manager
    .findAll()
    .then(managers => res.status(200).send(managers))
    .catch(error => res.status(400).send(error));
  },
  update(req, res) // to update data from table
  {        
    const id = req.params.id;        
    manager.update({ isActive: req.body.isActive, isOrganisingEvent: req.body.isOrganisingEvent },            
      { 
        where: { id: req.params.id}
      })
      .then(() => 
      {            
        res.status(200).send("Updated successfully Manager Detail with id = " + id);       
      })   
  },
  destroy(req, res) // to delete data from manager table
  {          
    manager.destroy(
    {          
      where :{id:req.params.id}          
    })          
    .then(() => res.status(200).send("Deleted successfully Manager"))         
    .catch(error => res.status(400).send(error));            
  },
};