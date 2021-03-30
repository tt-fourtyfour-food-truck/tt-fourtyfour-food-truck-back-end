exports.seed = function (knex) {
  
    const roles = [
      {
        name: "operator", // will get id 1
      },
      {
        name: "diner", // will get id 2
      },
    ];
  
    return knex("roles")
      .insert(roles)
      .then(() => console.log("\n== Seed role data for roles table added. ==\n"));
  };
  