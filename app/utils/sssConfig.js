import { ObjectId } from "mongodb";
import { SslCommerzPayment } from "sslcommerz";
const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASS;
const is_live = false;
export const sslConfig = new SslCommerzPayment(store_id, store_passwd, is_live);

const transactionId = new ObjectId().toString();
export const dataConfig = ({ totalPrice, name, email, city, mobile }) => {
  const data = {
    total_amount: totalPrice,
    currency: "BDT",
    tran_id: transactionId, // use unique tran_id for each api call
    success_url: `http://localhost:3000/api/payment/success?tran_id=${transactionId}`,
    fail_url: "http://localhost:3000/api/payment/fail",
    cancel_url: "http://localhost:3000/api/payment/cancel",
    ipn_url: "http://localhost:3000/payment/ipn",
    shipping_method: "Courier",
    product_name: "Computer",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: name,
    cus_email: email,
    cus_add1: city,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: mobile,
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  return data;
};
