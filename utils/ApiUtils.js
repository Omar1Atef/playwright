class APIUtils{

    constructor(request, loginPayLoad) {
      this.request = request;
      this.loginPayLoad = loginPayLoad;
  }

  async getToken(){

       const loginResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
          data: this.loginPayLoad
          });
          const loginResponseBody = await loginResponse.json();
          console.log(loginResponseBody);
          const token = loginResponseBody.token;
          console.log(token);
          return token;
  }

  async createOrder(orderPayload) {
       const orderResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
          data: orderPayload
      ,
        headers: {
          "Authorization": await this.getToken(),
          "content-type": "application/json"
       }
      });
  
      const orderResponseBody = await orderResponse.json();
      console.log(orderResponseBody);    
      console.log("orderID of your order: " + orderResponseBody.orders[0]);
      const orderID = orderResponseBody.orders[0];
      return orderID;
  }   
}

export default APIUtils;