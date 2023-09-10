'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categorizes', [
      {
        nameCategorize: 'Athletic Shoes & Sneakers',
        description:
          'JSneakers or trainers, also known by a wide variety of other names, are shoes primarily designed for sports or other forms of physical exercise but which are also widely used for everyday casual wear',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameCategorize: 'Boots',
        description:
          'A boot is a type of footwear. Most boots mainly cover the foot and the ankle, while some also cover some part of the lower calf. Some boots extend up the leg, sometimes as far as the knee or even the hip.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameCategorize: 'Sandals',
        description: `Sandals are an open type of shoe, consisting of a sole held to the wearer's foot by straps going over the instep and around the ankle. Sandals can also have a heel`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameCategorize: 'Dress Shoes',
        description:
          'JSneakers or trainers, also known by a wide variety of other names, are shoes primarily designed for sports or other forms of physical exercise but which are also widely used for everyday casual wear',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameCategorize: 'Comfort Shoes',
        description:
          'Flat shoes with padded heels and rounded toes are comfortable and ideal for warmer months. Comfortable sneakers with a full grain leather or mesh upper. Low-heeled shoes- generally, low-heeled shoes are comfortable. They offer more arch support than high heels.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameCategorize: 'Mules',
        description: `Mule is a style of shoe that has no back or constraint around the foot's heel. Mules have a history going as far back as Ancient Rome, even though they were not popularly worn until sixteenth-century Europe. There, mules were bedroom slippers and not worn in public.`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categorizes', null, {});
  },
};
