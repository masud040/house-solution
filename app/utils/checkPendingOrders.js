const { default: connectMongo } = require("@/db/connectMongo");
const { OrdersModel } = require("@/models/orders-model");

export default async function checkPendingOrders() {
  try {
    await connectMongo();

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    const result = await OrdersModel.updateMany(
      {
        status: "pending",
        createdAt: { $lt: tenMinutesAgo },
        ongoing_status: { $nin: ["to-ship", "to-review"] },
      },
      { status: "canceled" }
    );
  } catch (error) {
    console.error("Error in checkPendingOrders:", error);
  }
}
