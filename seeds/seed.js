const sequelize = require('../config/connection');
const {User, Plot, Character, Location} = require('../models')

// require json files
const charData = require('./charData.json')
const plotData = require('./plotData.json')
const locData = require('./locData.json')
const userData = require('./userData.json')

// seed function

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });

      await Location.bulkCreate(locData);
      await Character.bulkCreate(charData);
    await Plot.bulkCreate(plotData);

    process.exit(0);
}

// call seed function
seedDatabase();
