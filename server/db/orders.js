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

const addOrderItemToOrder = async ({email, productId, quantity, purcahsePrice}) => {
    const userOrders = await getAllOrdersByCustomer(email)
    const {customerId} = await getCustomerByCustomerEmail(email)
    let orderId = null;
    for (let i = 0; i < userOrders.length -1; i++) {
        if (userOrders[i].orderCompleted === false){
          orderId = userOrders[i].id    
        } 
        return orderId
    }
    if (orderId){
        createOrderItem(orderId, productId, quantity, purcahsePrice)   
    } else{ 
        orderId = createOrder(customerId)
        createOrderItem(orderId, productId, quantity, purcahsePrice)
    }
}

const createOrderItem = async ({orderId, productId, quantity, purcahsePrice}) => {
    try {
        const {rows: [orderItem] } = await client.query(`
        INSERT INTO order_items(productId, quantity, purchasePrice)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [orderId, productId, quantity, purcahsePrice])
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
    addOrderItemToOrder,
    createOrderItem,
    createOrder
}