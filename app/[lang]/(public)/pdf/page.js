import Image from "next/image";

export default function Pdf() {
  const styles = {
    container: {
      padding: 40,
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: 1.6,
    },
    header: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "700",
      fontSize: 32,
      borderBottom: "1px solid #ddd",
      padding: "0 0 10px 0",
      fontWeight: 700,
      color: "transparent",
      fontSize: "32px",
      backgroundImage: "linear-gradient(to right, #cc013f, #6b21a8)",
      backgroundClip: "text",
    },

    button: {
      margin: 10,
      display: "inline-block",
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
      gap: "10px",
    },
    productImage: {
      width: 100,
      height: 60,
      borderRadius: 5,
    },
    productDetails: {
      display: "block",
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
  };
  return (
    <div>
      <div style={styles.container}>
        <div style={styles.header}>
          <p>Sokher Corner</p>
        </div>
        <p style={styles.subHeader}>Your Order Confirmation!</p>
        <p>
          Hi <span style={styles.boldText}>Masud Rana</span>,
        </p>
        <div style={{ fontSize: 13 }}>
          <p>
            Your Order #<span style={styles.boldText}>321342t34</span> has been
            successfully confirmed, and your transaction ID is{" "}
            <span style={styles.boldText}>23r235253</span>.
          </p>
        </div>
        <div style={{ fontSize: 13 }}>
          <p>
            Your order is now being processed and will be shipped shortly. You
            can track your order's progress using the button below:
          </p>
        </div>
        <p style={styles.button}>Track Your Order</p>
        <div style={styles.productContainer}>
          <Image
            src="https://plus.unsplash.com/premium_photo-1670279526726-128d22144ad9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
            width={100}
            height={100}
            alt="Product 1"
            style={styles.productImage}
          />
          <div style={styles.productDetails}>
            <p style={styles.productText}>
              <p style={styles.boldText}>Product</p>
            </p>
            <p style={styles.productText}>Price: $100</p>
            <p style={styles.productText}>Quantity: 4</p>
          </div>
        </div>
        <p style={styles.footer}>Thank you for choosing Sokher Corner!</p>
      </div>
    </div>
  );
}
