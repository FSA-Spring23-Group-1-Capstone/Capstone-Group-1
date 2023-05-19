const APIURL = 'http:\\localhost:8080/api'

export const authenticateCustomer = async ({email, password, route}) => {
    try {
        const response  = await fetch(`${APIURL}/customer/${route}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({email, password})
        })

        const result = await response.json();
        const {token, email, message} = result;
        if(token){
            localStorage.setItem('token', token)
            return {email, token, message}
        }
        if(!token){
            return {message}
        }
        return
    } catch (error) {
        console.error(error)
    }
}

// export const authenticateCustomer = async ({email, password}) => {
//     try {
//         const response  = await fetch(`${APIURL}/customer/login`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({email, password})
//         })

//         const result = await response.json();
//         const {token, email, message} = result;
//         if(token){
//             localStorage.setItem('token', token)
//             return {email, token, message}
//         }
//         if(!token){
//             return {message}
//         }
//         return
//     } catch (error) {
//         console.error(error)
//     }
// }
