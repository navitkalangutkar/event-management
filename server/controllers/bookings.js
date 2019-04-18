const booking = require('../models').bookings;
const users = require('../models').users;
const events = require('../models').events;
const managers = require('../models').managers;
const moment = require('moment')
//const Sequelize= require('sequelize')
const { Op } = require("sequelize");
const Test = require('../models/index')

module.exports =
  {
    create(req, res) // to create booking table
    {
      var inputDate = new Date(req.body.inputDate);
      inputDate = moment(inputDate).format("YYYY-MM-DD");
      let userId= req.body.userId;
      let eventTypeId= req.body.eventTypeId;
      let managerId= req.body.managerId;
      
      booking.count({ where: { bookingDate: inputDate }
      }).then(function(count)
        {
          if(count !==0 )
          {
            res.send("Already Booked on given Date and Time")
          }
          else 
          {
            if(!userId||!eventTypeId||!managerId)
            {
            res.send("Field is missing. Check if user Id, Event Id, Manager Id is there.")
            }
            else 
            {
            users.findOne(
                {
                where: { id:userId }
                })
                .then(users => 
                    {
                    if(!users)
                        {res.send("Not found any user with that ID");}
                        else
                        {
                        events.findOne({where: { id:eventTypeId} })
                        .then(events => 
                            {if(!events) {res.send("Not found any event type with that ID");}
                                else
                                    {
                                     managers.findOne({ where: { id:managerId, isActive:1, isOrganisingEvent:0}})
                                    .then(managers => 
                                        {
                                        if(!managers){res.send("Manager already busy with another Event");}
                                        else
                                            {
                                            booking.create(
                                                {
                                                  eventName:req.body.eventName,  
                                                  amount:req.body.amount,
                                                  bookingDate:inputDate, 
                                                  userid:userId, 
                                                  eventTypeid:eventTypeId, 
                                                  managerid:managerId,
                                                })
                                                .then(bookings => res.status(201).send("Created Booking"))
                                                .catch(error =>res.status(400).send(error));
                                                managers.update({ isActive:'0', isOrganisingEvent:'1'},
                                                {
                                                    where: {id:managerId}
                                                })
                                                .then(managers => res.status(201).send(managers))
                                                .catch(error => res.status(400).send(error));
                                            }
                                        })
                                    }
                            })
                        }
                    })
            }
          }
        });
    },
    list(req, res) // to display all data from table
    {
      return booking
        .findAll()
        .then(bookings => res.status(200).send(bookings))
        .catch(error => res.status(400).send(error));
    },
    update(req, res) // to update data in booking table
    {
      const id = req.params.id;
      booking.update({ eventName: req.body.eventName },
        {
          where: { id: req.params.id }
        })
        .then(() => {
          res.status(200).send("Updated successfully a booking with id = " + id);
        })
    },
    destroy(req, res) // to delete data from table
    {
      booking.destroy(
        {
          where: { id: req.params.id }
        })
        .then(() => res.status(200).send("Deleted successfully a booking"))
        .catch(error => res.status(400).send(error));
    },
    findAvailableMgrByDate(req, res) 
    {
      var date2 = new Date()
      var date1 = new Date(req.params.dateofMgr)  
      var diffDate = Math.abs(date2.getTime() - date1.getTime())          
      var diffDate = (date2.getTime() - date1.getTime())           
      var diff = Math.ceil(diffDate / (1000 * 60 * 60 * 24))
      if(diff>0)
      {
         res.send("Given date is the past date. Please input valid date.");
      }
      else {
      Test.sequelize.query('CALL getAvailableMangers(:dateOfMgr)',
      { replacements: { dateOfMgr: req.params.dateofMgr }, 
      type: Test.sequelize.QueryTypes.SELECT 
      })    
      .then(function (data) 
      {       
        if (data) { 
                   res.send(data)      
                  } 
                  else {          
                          return res.status(404).send({ message: 'Managers are not available'})   
                        }      
                  })  
                }
      },
      availableDates(req, res)
      {
        var fromDate = new Date(req.body.fromDate);
        fromDate = moment(fromDate).format("YYYY-MM-DD");
        var toDate = new Date(req.body.toDate);
        toDate = moment(toDate).format("YYYY-MM-DD");
        booking.findAll({
          where: {[Op.and]:[{ bookingDate: {[ Op.between]: [ fromDate, toDate ]}}]}
        })
        .then( function(bookings) {
          if (bookings!="")
          {
            res.send(" No booking found between Date From: " +fromDate+ " To: "+ toDate);
          }
          else {
            res.send("Already booked on that dates.");
          }
        })
      },
      todayEvents(req, res) 
      {
        Test.sequelize.query('CALL getUpcomingEvents()',
      { 
      type: Test.sequelize.QueryTypes.SELECT 
      })    
      .then(function (data) 
      {       
        if (data) { 
                   res.send(data)      
                  } 
                  else {          
                          return res.status(404).send({ message: 'There is no Event on today date'})   
                        }      
                  })  
      },
      tomorrowEvents(req, res) 
      {
        Test.sequelize.query('CALL getTomorrowEvents()',
      { 
      type: Test.sequelize.QueryTypes.SELECT 
      })    
      .then(function (data) 
      {       
        if (data) { 
                   res.send(data)      
                  } 
                  else {          
                          return res.status(404).send({ message: 'There is no Event on tomorrow date'})   
                        }      
                  })  
      },
      weekEvents(req, res) 
      {
        Test.sequelize.query('CALL getUpcomingWeekEvents()',
      { 
      type: Test.sequelize.QueryTypes.SELECT 
      })    
      .then(function (data) 
      {       
        if (data) { 
                   res.send(data)      
                  } 
                  else {          
                          return res.status(404).send({ message: 'There is no Event on this week'})   
                        }      
                  })  
      },
      monthEvents(req, res) 
      {
        Test.sequelize.query('CALL getUpcomingMonthEvents()',
      { 
      type: Test.sequelize.QueryTypes.SELECT 
      })    
      .then(function (data) 
      {       
        if (data) { 
                   res.send(data)      
                  } 
                  else {          
                          return res.status(404).send({ message: 'There is no Event on this Month'})   
                        }      
                  })  
      },
      yearEvents(req, res)
      {
        Test.sequelize.query('CALL getUpcomingYearEvents(:dateOfMgr)',
      { replacements: { dateOfMgr: req.params.dateofMgr }, 
      type: Test.sequelize.QueryTypes.SELECT 
      })    
      .then(function (data) 
      {       
        if (data) { 
                   res.send(data)      
                  } 
                  else {          
                          return res.status(404).send({ message: 'There is no event on this year right now!'})   
                        }      
                  })  
      }
  };