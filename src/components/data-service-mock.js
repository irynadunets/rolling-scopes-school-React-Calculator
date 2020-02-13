let data = [
          {
          id: 1,
          msrp: "42818",
          vehicleName: "FORD MUSTANG EU",
          dealerName: "Galpin Motors,San Fernando Valley",
          dealerLocation: "New York, NY",
          dealerMail: "jack@dealer.com",
          dealerWeb: "http://www.dealer.com",
          dealerPhone: "800 636 456",
          dealerRating: "3"
          }
];

export let getData = new Promise((resolve, reject) => {
   setTimeout(() => {
       resolve(data[0]);
   }, 5000);
});
export let getDataMsrp = new Promise((resolve, reject) => {
   setTimeout(() => {
       resolve(data[0].msrp);
   }, 2000);
});
