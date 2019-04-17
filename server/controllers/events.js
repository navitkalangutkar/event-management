const event = require('../models').events;

module.exports = {
  create(req, res) // to create event table 
  {
    event.create(
      {
        id:req.body.id,
        eventType: req.body.eventType,
      })
        .then(event => res.status(201).send(event))
        .catch(error => res.status(400).send(error));
  },
  list(req, res) // to display all events from table
  {
    return event
    .findAll()
    .then(events => res.status(200).send(events))
    .catch(error => res.status(400).send(error));
  },
  update(req, res) // to update data from table
  {        
    const id = req.params.id;        
    event.update({ eventType: req.body.eventType},            
      { 
        where: { id: req.params.id}
      })
      .then(() => 
      {            
        res.status(200).send("Updated successfully Event with id = " + id);       
      })   
  },
  destroy(req, res) // to delete data from event
  {          
    event.destroy(
    {          
      where :{id:req.params.id}          
    })          
    .then(() => res.status(200).send("Deleted successfully Event"))         
    .catch(error => res.status(400).send(error));            
  }, 
};