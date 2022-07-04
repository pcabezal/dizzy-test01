
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

// original mongo url
// 'mongodb+srv://pcabezal:Overmind8@cluster0.xdpij.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect('mongodb+srv://pcabezal:Overmind8@cluster0.xdpij.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true })
                    
    .then(client => {
        console.log('connected total mongo bro')
        const db = client.db('starWars')
        const quotesCollection = db.collection('quotes')
        // ========================
        // Middlewares
        // ========================
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    res.render('index.ejs', {quotes: results})
                })
                .catch(error => console.log(error))
            
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
              .then(result => {
                res.redirect('/')
              })
              .catch(error => console.error(error))
          })

          app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: 'Yoda' },
                {
                  $set: {
                    name: req.body.name,
                    quote: req.body.quote
                  }
                },
                {
                  upsert: true
                }
              )
                .then(result => {
                    res.json('Success')
                })
                .catch(error => console.error(error))
          })

          app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
              { name: req.body.name }
            )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No quote to delete')
                  }
                res.json(`Deleted Darth Vadar's quote`)
              })
              .catch(error => console.error(error))
          })

        app.listen()
    })
    .catch(error => console.error(error))

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function() {
    console.log('Listening on port andre3000')
})


