const User = require('./user');
const Location = require('./location');
const Character = require('./character');
const Plot = require('./plot');

User.hasMany(Plot, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Plot.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Character, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Character.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Location, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Location.belongsTo(User, {
  foreignKey: 'user_id'
});

Location.hasMany(Character, {
  foreignKey: 'location_id'
});

Character.belongsTo(Location, {
  foreignKey: 'id'
});

Plot.hasOne(Location, {
  foreignKey: 'id'
});

// Location.belongsTo(Plot, {
//   foreignKey: 'location_id'
// });

module.exports = { User, Location, Character, Plot }