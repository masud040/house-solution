import { getSuccessOrderedProducts } from "@/db/queries";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { fetchImageAsBase64 } from "./fetchImageAsBase64";
// Styling for the PDF content
const styles = StyleSheet.create({
  container: {
    padding: 40,
    maxWidth: 600,
    margin: "0 auto",
    lineHeight: 1.6,
  },
  header: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: 700,
    borderBottom: "1px solid #ddd",
    padding: "0 0 10px 0",
    color: "#cc013f", // Replace gradient with a solid color
  },
  button: {
    margin: 10,
    display: "flex", // Use 'flex' instead of 'inline-block'
    padding: 10,
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
    backgroundColor: "#d81b60",
    textDecoration: "none",
    borderRadius: 5,
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
    color: "#777",
  },
  productContainer: {
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
    display: "flex",
    flexDirection: "row", // Explicitly set flex direction
    gap: 10, // 'gap' is supported in newer versions
  },
  productImage: {
    width: 100,
    height: 60,
    borderRadius: 5,
  },
  productDetails: {
    display: "flex", // Use 'flex' instead of 'block'
    flexDirection: "column",
  },
  productText: {
    margin: 0,
    fontSize: 12,
  },
  boldText: {
    fontWeight: 700,
  },
  subHeader: {
    textAlign: "center",
    fontWeight: 700,
    marginTop: 10,
  },
});

export const pdfGenerator = async ({
  trans_id,
  order_ids,
  user_name,
  user_id,
}) => {
  const order_products = await getSuccessOrderedProducts({
    userId: user_id,
    order_ids: order_ids.split(","),
  });

  const productItems = await Promise.all(
    order_products.map(async (order) => {
      const totalPrice =
        (order.product_price -
          order.product_price * (order.product_discount / 100)) *
        order.quantity;
      console.log("total", totalPrice);
      const base64Image = await fetchImageAsBase64(order.product_thumbnail);
      console.log("64", base64Image);
      return (
        <View style={styles.productContainer} key={order.id}>
          <Image
            src={base64Image} // Now a base64 image
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productText}>
              <Text style={styles.boldText}>{order.product_name}</Text>
            </Text>
            <Text style={styles.productText}>
              Price: ${Math.floor(totalPrice)}
            </Text>
            <Text style={styles.productText}>Quantity: {order.quantity}</Text>
          </View>
        </View>
      );
    })
  );
  console.log("product Items", productItems);

  const doc = (
    <Document>
      <Page size="A4" style={styles.container}>
        <View>
          <Text style={styles.header}>Sokher Corner</Text>
          <Text style={styles.subHeader}>Your Order Confirmation!</Text>
        </View>
        <Text>
          Hi <Text style={styles.boldText}>{user_name}</Text>,
        </Text>
        <View style={{ fontSize: 13 }}>
          <Text>
            Your Order #<Text style={styles.boldText}>{order_ids}</Text> has
            been successfully confirmed, and your transaction ID is{" "}
            <Text style={styles.boldText}>{trans_id}</Text>.
          </Text>
        </View>
        <View style={{ fontSize: 13 }}>
          <Text>
            Your order is now being processed and will be shipped shortly. You
            can track your order's progress using the button below:
          </Text>
        </View>
        <Text style={styles.button}>Track Your Order</Text>
        {productItems}
        <Text style={styles.footer}>Thank you for choosing Sokher Corner!</Text>
      </Page>
    </Document>
  );

  // Generate PDF buffer from the document
  const pdfBuffer = await pdf(doc).toBuffer();
  return pdfBuffer;
};
