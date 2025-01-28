import { auth } from "@/auth";
import { getUserByEmail } from "@/db/queries";

const { default: connectMongo } = require("@/db/connectMongo");
const { OrdersModel } = require("@/models/orders-model");

export default async function cancelOldPendingOrders() {
  try {
    await connectMongo();
    const session = await auth();
    const user = await getUserByEmail(session.user.email);
    const twintyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000);

    const result = await OrdersModel.updateMany(
      {
        status: "pending",
        createdAt: { $lt: twintyMinutesAgo },
        userId: user.id,
        ongoing_status: { $nin: ["to-ship", "to-review"] },
      },
      { status: "canceled" }
    );
    console.log(`Canceled ${result.modifiedCount} pending orders.`);
    return result;
  } catch (error) {
    console.error("Error in checkPendingOrders:", error);
  }
}
