const studentRouter = require('./student.js')

function router(app){
    app.use('/students', studentRouter)
}

module.exports = router