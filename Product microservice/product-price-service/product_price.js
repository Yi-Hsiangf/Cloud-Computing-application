module.exports = function (options) {
    //Import the mock data json file
    const mockData = require('./MOCK_DATA.json');
    //To DO: Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductPrice', productPrice);

    //To DO: add the pattern functions and describe the logic inside the function
    function productPrice(args, respond) {
        if(args.productId){
            var Price;
            var i;
            for (i=0; i < mockData.length;i++) {
                if(mockData[i]["product_id"] == args.productId) {
                    Price = mockData[i]["product_price"];
                }
            }
            respond(null, { result: Price });
        }
        else {
            respond(null, { result: ''});
        }
    }
}
