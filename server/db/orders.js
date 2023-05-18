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


const addItemToOrder = async (email) => {
    const userOrders = await getAllOrdersByCustomer(email)
    let unfinishedOrder = null;
    for (let i = 0; i < userOrders.length -1; i++) {
        if (userOrders[i].orderCompleted === false){
             unfinishedOrderId = userOrders[i].id    
        } 
        return unfinishedOrderId
    }
    if (unfinishedOrderId){
        createOrderItem()
        addOrderItemToOrder()
    } else{   addProductsToOrderItem()
        createOrder(orderItem)
    }
}