// https://sequelize.org/v5/manual/getting-started.html

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/user.sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

class User extends Model {}

User.init({
      vid: {
        type: Sequelize.STRING,
        allowNull: false
      },
      "name": Sequelize.STRING,
      "value": Sequelize.INTEGER,
      "full": Sequelize.BOOLEAN,
      "click": Sequelize.INTEGER,
      "cat": Sequelize.STRING,
      "icon": Sequelize.STRING,
      "desc": Sequelize.STRING,
}, {
  sequelize,
  modelName: 'user'
});


//sequelize .authenticate().then(console.log)
init_user=async ()=>{
    await User.sync({ force: false})
 //   User.create({ vid:"1234"})
    return User.findAll()
}

list_users=async ()=>{
    d=await User.findAll()
    return d.map(x=>x.dataValues)
}


init_tables=()=>{
    await sequelize.sync()
    u={
        "vid": "76924631",
        "name": "76924631",
        "value": 1,
        "full": false,
        "click": 0,
        "cat": "library",
        "icon": "https://image.flaticon.com/icons/png/512/346/346167.png",
        "desc": ""
      }
    r=await User.create(u)
    console.log(r.toJSON())
}



test=()=>{
    User.create({"vid":123})
    User.findOrCreate({where: {vid: '123'}, defaults: {job: 'Technical Lead JavaScript'}})

    User.findAll()
    User.findOne({ where: {title: 'aProject'} })
    User.findByPk(123)
    User.findOne({ where: {title: 'aProject'}, attributes: ['id', ['name', 'title']] })

    User.update({ vid: "234" }, { where: { vid: "123" } })

    User.destroy({ where: { vid: "123" } })
}




module.exports={User}
