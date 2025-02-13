export default {
  getAll: () => {
    return {
      msg: "Get All",
    };
  },

  create: (data) => {
    return {
      msg: "Create",
    };
  },

  getOne: (id) => {
    return {
      msg: "Get Data by id: " + id,
    };
  },

  update: (id, data) => {
    return { id };
  },

  delete: (id) => {
    console.log(`Data ws deleted, id: ${id}`);
  },
};
