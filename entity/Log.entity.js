const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Conexión a la base de datos

const Log = sequelize.define('Log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ruta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metodo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creadoEn: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'logs',
  timestamps: true,  // Sequelize maneja automáticamente el campo creadoEn
  createdAt: 'creadoEn',
  updatedAt: false,  // No usamos updatedAt en este caso
});

module.exports = Log;
