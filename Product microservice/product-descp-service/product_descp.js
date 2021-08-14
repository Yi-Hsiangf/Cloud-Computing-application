module.exports = function (options) {
    //Import the mock data json file
    
    const mockData = require('./MOCK_DATA.json');

    //Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductURL', productURL);
    this.add('role:product,cmd:getProductName', productName);


    //To DO: add the pattern functions and describe the logic inside the function
    function productURL(args, respond) {
        if(args.productId){
            var URL;
            for (var i=0; i < mockData.length;i++) {
                if(mockData[i]["product_id"] == args.productId) {
                    URL = mockData[i]["product_url"];    
                }
            }
            respond(null, { result: URL });
        }
        else {
            respond(null, { result: ''});
        }
    }

    function productName(args, respond) {
        if(args.productId){
            var Name;
            for (var i=0; i < mockData.length;i++) {
                if(mockData[i]["product_id"] == args.productId) {
                    Name = mockData[i]["product_name"];    
                }
            }
            respond(null, { result: Name });
        }
        else {
            respond(null, { result: ''});
        }
    }
}
