const express = require('express')
const router = express.Router()
const database = require('../database/database')

/*await client.release()
            await client.end() */
const db = {
    getAllCustomers: function(req,res,next) {
        database.pool.query('select * from customer', 
        (err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            req.customers = response.rows;
            
            next();
        })
        /*
            req.customers = response.rows; */
        
    },
    addCustomer: function(req,res,next) {
        database.pool.query(`insert into customer(name,surname,tel,email, status) values($1,$2,$3,$4, $5) returning id`, 
        [req.body.name,req.body.surname, req.body.tel, req.body.email, req.body.status],
        (err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows[0].id)
            req.customer_id = response.rows[0].id;
            
            next();
        })
    },
    getAllPrograms:function(req,res,next) {
        database.pool.query('SELECT * from washing_program', (err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows)
            req.programs = response.rows;
            
            next();
        })
    },
    getAllSteps:function(req,res,next) {
        database.pool.query('SELECT * from step', (err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows)
            req.steps = response.rows;
            
            next();
        })
    },
    addStep: function(req,res,next) {
        database.pool.query(`insert into step(type) values($1) returning id`, [req.body.step],(err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows)
            req.step_id = response.rows[0].id
            
            next();
        })
    },
    addProgram:function(req,res,next) {
        database.pool.query(`select add_program($1,$2,$3)`, [req.body.name, req.body.price, req.body.steps],(err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows)
            console.log(response.rows)
            req.program_id = response.rows[0].add_program
            
            next();
        })
    },
    getProgramDetails: function(req,res,next) {
        console.log(req.params.id)
        database.pool.query(`
            select wp.name, wp.price, s.type from washing_program_details
            inner join washing_program wp on wp.id = washing_program_details.washing_program_id
            inner join step s on washing_program_details.step_id = s.id
            where washing_program_details.washing_program_id = cast($1 as int)`, [req.params.id],(err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows)
            console.log(response.rows)
            req.program_details = response.rows

            next();
        })
    },
    getProgramOrders: function(req,res,next) {
        database.pool.query(`
        select c.id, c.name, c.surname, 
        concat(extract(day from "order".date),'.',extract(month from "order".date),'.',extract(year from "order".date)) as date from "order"
        inner join customer c on "order".customer_id = c.id
        where "order".washing_program_id = $1`, [req.params.id],(err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows)
            req.program_orders = response.rows
            
            next();
        })
    },
    getAllOrders:function(req,res,next) {
        database.pool.query(`
        select c.id as customer_id, c.name as name, c.surname as surname,
               o.price as price, wp.name as program, wp.id as program_id, 
               concat(extract(day from o.date),'.',extract(month from o.date),'.',extract(year from o.date)) as date from "order" o
        inner join customer c on o.customer_id = c.id
        inner join washing_program wp on o.washing_program_id = wp.id;`,(err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows)
            req.orders = response.rows
            
            next();
        })
    },
    addOrder:function(req,res,next) {
        database.pool.query(`
        insert into "order"(customer_id, washing_program_id, discount, price) values($1,$2,$3,$4) returning date`,
         [req.body.customer_id, req.body.program_id, req.body.discount, req.body.price],(err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            req.date = response.rows[0].date
            next();
        })
    },
    getCustomerOrders: function(req,res,next) {
        database.pool.query(`
        select c.id, c.name as customer_name, c.surname as customer_surname,
        c.tel, c.email, c.status, wp.name as program_name, wp.id as program_id, 
        concat(extract(day from o.date),'.',extract(month from o.date),'.',extract(year from o.date)) as date, o.price from "order" o
        inner join customer c on c.id = o.customer_id
        inner join washing_program wp on o.washing_program_id = wp.id
        where o.customer_id = cast($1 as int)`,
         [req.params.id],(err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows)
            req.customer_orders = response.rows
            next();
        })
    }, 
    getCustomer:function(req,res, next) {
        database.pool.query(`select * from customer where id = cast($1 as int)`,
         [req.params.id],(err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows)
            req.customer = response.rows
            next();
        })
    },
    getTopCustomers:function(req,res,next) {
        database.pool.query(`select count(*), concat(c.name, ' ', c.surname) as customer from "order"
        inner join customer c on c.id = "order".customer_id
        group by customer order by count desc limit 5`,(err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows)
            req.top_customers = response.rows;
            next();
        })
    },
    getTopPrograms:function(req,res,next) {
        database.pool.query(`select count(*), wp.name from "order" o
        inner join washing_program wp on o.washing_program_id = wp.id
        group by wp.name order by count desc limit 5`,(err, response) => {
            if(err) {
                console.log(err)
                next()
                return;
            }
            console.log(response.rows)
            req.top_programs = response.rows;
            next();
        })
    } 
    
}

router.get('/getAllCustomers', db.getAllCustomers,function(req,res) {
    res.send({customers:req.customers})
})


router.get('/getAllPrograms', db.getAllPrograms, function(req,res) {
    
    res.send({programs:req.programs})
})

router.get('/getAllSteps', db.getAllSteps, function(req,res) {
    console.log("EVOOO MEE")
    console.log(req.steps)
    res.send({steps:req.steps})
})

router.get('/getProgramDetails/:id', db.getProgramDetails, function(req,res) {
    res.send({program_details:req.program_details})
})

router.get('/getProgramOrders/:id', db.getProgramOrders, function(req,res) {
    res.send({program_orders:req.program_orders})
})

router.get('/getAllOrders', db.getAllOrders, function(req,res) {
    res.send({orders:req.orders})
})

router.get('/getDataForAddOrder', db.getAllCustomers, db.getAllPrograms, function(req,res) {
    res.send({customers:req.customers,programs:req.programs})
})

router.get('/getCustomerOrders/:id', db.getCustomerOrders, db.getCustomer, function(req,res) {
    res.send({customer_orders:req.customer_orders, customer:req.customer})
})


router.get('/getStatistics', db.getTopCustomers, db.getTopPrograms, function(req,res) {
    res.send({top_customers:req.top_customers, top_programs:req.top_programs})
})

router.post('/addCustomer', db.addCustomer, function(req,res) {
    
    res.send({customer_id:req.customer_id})
})


router.post('/addStep', db.addStep, function(req,res) {
    res.send({id:req.step_id})
})

router.post('/addProgram', db.addProgram,function(req, res) {
    console.log(req.body)
    console.log(typeof req.body.steps[0])
    res.send({program_id:req.program_id})
})

router.post('/addOrder', db.addOrder, function(req,res) {
    res.send({date:req.date})
})

module.exports = router