
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://dizzy:ballin@cluster0.nrtlq.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology: true })            
  .then(client => {
    console.log('connected total mongo bro')
    const db = client.db('dizzy-stats')
    const deathList = db.collection('death-list')

    // Middlewares
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    app.get('/', (req, res) => {
      db.collection('death-list').find().toArray()
          .then(results => {
              res.render('index.ejs', {deathStats: results})
          })
          .catch(error => console.log(error))
    })

    app.post('/death-list', (req, res) => {
      deathList.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.put('/death-list', (req, res) => {
      deathList.findOneAndUpdate(
        { playerName: 'testman' },
        {
          $set: {
            playerName: req.body.playerName,
            deathX: req.body.deathX,
            deathY: req.body.deathY,
            sector: req.body.sector,
            deathTime: req.body.deathTime
          }
        },
        {
          upsert: true  // create new death if there are no testman deaths to replace
        }
      )
      .then(result => {
          res.json('Success')
      })
      .catch(error => console.error(error))
    })

    app.delete('/death-list', (req, res) => {
      deathList.deleteOne(
        { playerName: req.body.playerName }
      )
      .then(result => {
          if (result.deletedCount === 0) {
              return res.json('Nothing to delete')
            }
          res.json(`Deleted something`)
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