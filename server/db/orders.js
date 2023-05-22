const client = require("./client");
const { getCustomerByCustomerEmail } = require("./customers");

const getAllOrdersByCustomer = async (email) =>{
    const {id} = await getCustomerByCustomerEmail(email)
    try {
        const {rows: orders} = await client.query(
        `
        SELECT * FROM orders
        WHERE id = ($1) 
        RETURNING *
        `, [id]
        )
        return orders;
    } catch (error) {
        
    }
}

const getOrderIdByCustomerId = async (customerId) => {
    console.log('uuuuu', customerId)
    try {
        const {rows: [id]} = await client.query(`
        SELECT *
        FROM orders
        WHERE "customerId"=$1;
        `, [customerId])
        console.log('ppp', id)
        return id    
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const createOrderItem = async (customerId, productId, quantity, purchasePrice) => {
    try {
        const order = await getOrderIdByCustomerId(customerId)
        const orderId = order.id;
        const {rows: [orderItem] } = await client.query(`
        INSERT INTO order_items("orderId", "productId", quantity, "purchasePrice")
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [orderId, productId, quantity, purchasePrice])
        return orderItem
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const createOrder = async (customerId) => {
    try {
        const {rows: [order] } = await client.query(`
        INSERT INTO orders("customerId")
        VALUES ($1)
        RETURNING *
        `, [customerId] )
        const {orderId} = order
        return orderId
    } catch (error) {
       console.error(error);
       throw error; 
    }
}

const updateOrderItemQuantity = async (orderItemId, quantity) => {
    try {
        const {rows: [orderItem]} = await client.query(`
        UPDATE order_items
        SET quantity = $1
        WHERE "orderItemId" = $2;
        `, [quantity, orderItemId])
        return orderItem
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

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

module.exports = {
    getAllOrdersByCustomer,
    createOrderItem,
    createOrder,
    updateOrderItemQuantity,
    deleteOrdeItem
}