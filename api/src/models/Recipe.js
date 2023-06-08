const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      score: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      steps: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      createdInDb: {
        type: DataTypes.BOOLEAN, // Llama los datos que están en forma de BOOLEAN.
        allowNull: false, // No permite que esté vacío (ya que es obligatoria).
        defaultValue: true,
      },

      /////
    },

    { timestamps: false } // Es para quitar las columnas "createdAt" y "updatedAt " en la base de datos.
  );
};
