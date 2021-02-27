import { URLAttributes } from '../Model/URL';

export default {
  up: async (queryInterface) => {
    await queryInterface.createTable("URL", URLAttributes);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("URL");
  },
};
