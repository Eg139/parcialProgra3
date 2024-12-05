const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Conexión a la base de datos

const ObraDeArteSequelize = sequelize.define('ObraDeArte', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anioDeCreacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 0,
    },
  },
  tipo: {
    type: DataTypes.ENUM('pintura', 'escultura'),
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'obras_de_arte',
  timestamps: true, 
  createdAt: 'creadoEn',
  updatedAt: 'modificadoEn',
});

module.exports = ObraDeArteSequelize;
