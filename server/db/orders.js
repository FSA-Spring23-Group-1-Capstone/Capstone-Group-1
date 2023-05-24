const client = require("./client");
const { getCustomerByCustomerEmail } = require("./customers");

const getAllOrdersByCustomer = async (email) => {
  const { id } = await getCustomerByCustomerEmail(email);

  try {
    const {
      rows: [orders],
    } = await client.query(
      `
        SELECT * FROM orders
        WHERE "customerId" = $1
        `,
      [id]
    );
    return orders;
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
        WHERE "customerId"=$1;
        `,
      [customerId]
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
  purchasePrice
) => {
  const orderItemExist = await getOrderItemByProductId(productId);
  // console.log("this is the order item quantity", orderItemExist.quantity);
  try {
    if (orderItemExist) {
      const updatedOrderItem = await updateOrderItemQuantity(
        orderItemExist.orderItemId,
        orderItemExist.quantity + 1
      );

      return updatedOrderItem;
    }
    const order = await getOrderIdByCustomerId(customerId);
    const orderId = order.id;
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
    const { orderId } = order;
    return orderId;
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
const getAllOrderItemsByOrderId = async (orderId) => {
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
};

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
};
