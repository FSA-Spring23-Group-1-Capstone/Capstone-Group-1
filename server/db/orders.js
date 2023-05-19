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


const createOrderItem = async ({customerId, productId, quantity, purchasePrice}) => {
    try {
        const {rows: [orderId] } = await client.query(`
        SELECT * FROM orders
        WHERE "customerId" = $1
        AND "orderCompleted" = $2
        `, [customerId, false]);
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
        INSERT INTO orders(customerId)
        VALUES "customerId" = ($1)
        `, [customerId] )
        const {orderId} = order
        return orderId
    } catch (error) {
       console.error(error);
       throw error; 
    }
}

module.exports = {
    getAllOrdersByCustomer,
    createOrderItem,
    createOrder
}