import React from "react";

const Account = ({ allCustomerOrders }) => {
  if (allCustomerOrders.length === 1) {
    return (
      <div>
        <h2 className="account">Account Page</h2>
        <div>No Completed Orders</div>
      </div>
    );
  } else {
    return (
      <div id="orders">
        <h2 className="account">Account Page</h2>
        <table>
          <thead>
            <tr>
              <th>Order id</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {allCustomerOrders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {" "}
                    {order.orderCompleted ? "Completed" : "Not Completed"}
                    {!order.orderCompleted ? (
                      <span id="corder">*Current Order*</span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Account;
