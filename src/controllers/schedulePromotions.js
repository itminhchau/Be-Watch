import db from '../models';
var cron = require('node-cron');
const Sequelize = require('sequelize');
async function updateProducts() {
  try {
    const currentDate = Date.parse(new Date()) / 1000;
    console.log(currentDate);
    //  Tìm các khuyến mãi đã hết hạn
    const expiredPromotions = await db.Promotion.findAll({
      where: {
        expDate: { [Sequelize.Op.lt]: currentDate },
      },
    });

    console.log('tim', expiredPromotions);
    // Cập nhật các sản phẩm có idPromotion chứa khuyến mãi hết hạn về idPromotion = 0
    for (const promotion of expiredPromotions) {
      await db.Product.update(
        { idPromotion: 0 },
        {
          where: { idPromotion: promotion.id },
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

// Lên lịch chạy công việc mỗi giờ
var task = cron.schedule('0 0 * * *', () => {
  console.log('Chạy cập nhật sản phẩm');
  updateProducts();
});

export default task;
