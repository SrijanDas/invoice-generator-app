import dateFormat, { masks } from "dateformat";
import Logo from "../assets/logo.png";

function GetTime(date) {
  var hours = parseInt(dateFormat(date, "hh"));
  var minutes = parseInt(dateFormat(date, "MM"));
  var ampm = hours >= 12 ? "AM" : "PM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const PdfCode = ({
  name,
  date,
  address,
  mobileNo,
  quantity,
  invoice,
  products,
  total,
  receivedBalance,
  paymentType,
  remainingBalance,
}) => {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    const subtotal = item.price * item.unit;
    const discount = (subtotal * (item.discount / 100)).toFixed(2);
    const tax = ((subtotal - discount) * (item.tax / 100)).toFixed(2);

    table += `
    <tr style="background-color: rgba(246, 221, 178, 0.8);">
      <td style="text-align: center;height: 40px;">${i + 1}</td>
      <td style="text-align: center;height: 40px;">${item.itemName}</td>
      <td style="text-align: center;height: 40px;">${item.unit}</td>
      <td style="text-align: center;height: 40px;">₹ ${item.price}</td>
      <td style="text-align: center;height: 40px;">₹ ${
        discount + `<br/>(${item.discount} %)`
      }</td>
      <td style="text-align: center;height: 40px;">₹ ${
        tax + `<br/>(${item.tax} %)`
      }</td>
      <td style="text-align: center;height: 40px;">₹ ${item.total}</td>
    </tr>
    `;
  }
  table += `
  <tr style="background-color: white; color: black;">
      <td style="text-align: center;height: 40px;"></td>
      <td style="text-align: center;height: 40px; font-weight:bold;">Total</td>
      <td style="text-align: center;height: 40px;"></td>
      <td style="text-align: center;height: 40px;"></td>
      <td style="text-align: center;height: 40px;"></td>
      <td style="text-align: center;height: 40px;"></td>
      <td style="text-align: center;height: 40px; font-weight:bold;">₹ ${total}</td>
  </tr>
  `;
  let html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body >
    <div style="min-height: auto;
    width: 100%;
    height : 97vh;
    border: solid 2px #000;"  >
    <div style="height: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    /* padding: 20px; */
    justify-content: space-between;
    align-items: center;">
    <div class="data-title">
        <div style="display: flex;
        flex-direction: column;
        align-items: flex-start;        
        padding: 20px;">
        <span style="font-size: 2rem;font-weight: bold; ">RR Enterprise</span>
        <span style="">email@gmail.com | PH: +91 983123456</span>
        </div>
    </div>
        
    </div>    
        <hr/>
        <div style="
        width: 100%;
        height: auto;
        padding: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        ">
            <div style="
            width: 50%;
            align-items: flex-start;
            ">
                <p class="invoice-user">
                    Bill To : <br/>
                    Name : ${name} <br/>
                    ${address && `Address : ${address} <br/>`}
                    ${mobileNo && `Phone No : +91 ${mobileNo} <br/>`}
                </p>
            </div>
            <div style="align-items: flex-end;">
                <p>Invoice No : ${invoice}<br/>
                Date : ${dateFormat(date, "dd-mm-yyyy")}<br/>
                Time :${GetTime(new Date())}</p>
                <br/>
              
            </div>
        </div>
      
        <div style="height: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;">
            <table style="width:100%; border-collapse: collapse;">
                <tr style="background-color: rgba(255, 0, 62, 0.8); color: white;">
                  <th style="height: 30px;">#</th>
                  <th style="height: 30px;">Item Name</th>
                  <th style="height: 30px;">Unit</th>
                  <th style="height: 30px;">Price/unit</th>
                  <th style="height: 30px;">Discount(%)</th>
                  <th style="height: 30px;">Tax</th>
                  <th style="height: 30px;">Sub Total</th>
                </tr>
                ${table}              
               
              </table>
              <hr /> 

                
              <!--  <tr style="border-bottom: solid ;">
                            <th style="text-align: start;">Received Balance : </th>
                            <td style="text-align: center;height: 30px;">₹ ${receivedBalance}</td>
                        </tr>
                       
                        <tr style="border-bottom: solid ;">
                        <th style="text-align: start;">Remaining Balance : </th>
                        <td style="text-align: center;height: 30px;">₹ ${remainingBalance}</td>
                    </tr>
                     <tr>
                            <th style="text-align: start;">Payment Method: </th>
                            <td style="text-align: center;height: 30px;">${paymentType}</td>
                        </tr>
                        -->
                  </table>
              </div>
        </div>

    
        

    </div>
  </body>
</html>
`;
  return html;
};
const style = `
    .container {
      margin : 15px;
      border : solid 2px #000
    }
`;

export { PdfCode };
