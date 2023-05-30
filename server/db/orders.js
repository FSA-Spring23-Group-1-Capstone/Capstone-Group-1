const client = require("./client");
const { getCustomerByCustomerEmail } = require("./customers");

const getAllOrdersByCustomer = async (email) => {
  const { id } = await getCustomerByCustomerEmail(email);

  try {
    const { rows } = await client.query(
      `
        SELECT * FROM orders
        WHERE "customerId" = $1
        `,
      [id]
    );
    return rows;
  } catch (error) {}
};

const getOrderIdByCustomerId = async (customerId) => {
  try {
    const {
      rows: [id],
    } = await client.query(
      `
        SELECT *
        FROM orders
        WHERE "customerId"=$1 AND "orderCompleted"=$2;
        `,
      [customerId, false]
    );

    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createOrderItem = async (
  customerId,
  productId,
  quantity,
  purchasePrice,
  orderId
) => {
  const allOrderItemsFromCustomer = await getAllOrderItemsByOrderId(orderId);
  console.log("All items from a customer", allOrderItemsFromCustomer);
  try {
    let foundMatch = false;
    for (let i = 0; i < allOrderItemsFromCustomer.length; i++) {
      if (allOrderItemsFromCustomer[i].productId === productId) {
        await updateOrderItemQuantity(
          allOrderItemsFromCustomer[i].orderItemId,
          allOrderItemsFromCustomer[i].quantity + 1
        );
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) {
      const {
        rows: [orderItem],
      } = await client.query(
        `
              INSERT INTO order_items("orderId", "productId", quantity, "purchasePrice")
              VALUES ($1, $2, $3, $4)
              RETURNING *;
              `,
        [orderId, productId, quantity, purchasePrice]
      );
      return orderItem;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createOrder = async (customerId) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders("customerId")
        VALUES ($1)
        RETURNING *
        `,
      [customerId]
    );
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const toggleOrderCompelted = async (orderId) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      UPDATE orders
      SET "orderCompleted" = $1
      WHERE id = ${orderId}
      RETURNING *;
        `,
      [true]
    );
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateOrderItemQuantity = async (orderItemId, quantity) => {
  try {
    const {
      rows: [orderItem],
    } = await client.query(
      `
        UPDATE order_items
        SET quantity = $1
        WHERE "orderItemId" = $2
        RETURNING *;
        `,
      [quantity, orderItemId]
    );
    return orderItem;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteOrdeItem = async (orderItemId) => {
  try {
    const {
      rows: [deletedOrderItem],
    } = await client.query(
      `
          DELETE FROM order_items
          WHERE "orderItemId" = $1
          RETURNING *;
          `,
      [orderItemId]
    );
    return deletedOrderItem;
  } catch (error) {
    throw error;
  }
};
async function getAllOrderItemsByOrderId(orderId) {
  try {
    const { rows } = await client.query(
      `
  SELECT * FROM order_items
  WHERE "orderId" = $1
  `,
      [orderId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getOrderItemByProductId(productId) {
  try {
    const {
      rows: [orderItems],
    } = await client.query(
      `
  SELECT * FROM order_items
  WHERE "productId" = $1
  `,
      [productId]
    );
    return orderItems;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllOrdersByCustomer,
  createOrderItem,
  createOrder,
  updateOrderItemQuantity,
  deleteOrdeItem,
  getAllOrderItemsByOrderId,
  getOrderIdByCustomerId,
  toggleOrderCompelted,
};
