module.exports = {
    create : (req, res) => {
        const db = req.app.get('db'),
           {companyName} = req.body
        
           db.company.insert(companyName).then(result => {
               res.send();
           }).catch(err =>{
               console.log(err);
               res.status(500).send('database error');
           })
        },
    read: (req, res) =>{
        const db = req.app.get('db')
        db.company.readAll().then(result => {
            res.send(result);
        }).catch(err =>{
            console.log(err);
            res.status(500).send('database error');
        })
    }
}