const subscriptionSuccessEmail = (
  name,
  plan,
  amount,
  endDate
) => {
  return `
  <div style="
    font-family: Arial, sans-serif;
    padding:20px;
    color:#333;
  ">

    <h2 style="color:#2563eb;">
      Your PropertyHub ${plan} Plan is Activated 🎉
    </h2>

    <p>
      Hi ${name},
    </p>

    <p>
      Thank you for upgrading your PropertyHub subscription.
    </p>

    <p>
      Your plan has been successfully activated.
    </p>


    <h3>Subscription Details:</h3>

    <ul>
      <li><b>Plan:</b> ${plan}</li>
      <li><b>Amount:</b> ₹${amount}</li>
      <li><b>Valid Until:</b> ${new Date(endDate).toLocaleDateString("en-IN")}</li>
    </ul>


    <h3>You can now enjoy:</h3>

    <ul>
      <li>Higher property listing limits</li>
      <li>More PG listings</li>
      <li>Better visibility</li>
      <li>Premium features</li>
    </ul>


    <p>
      Start growing your property business today 🚀
    </p>


    <br/>

    <b>
      PropertyHub Team
    </b>

  </div>
  `;
};


module.exports = subscriptionSuccessEmail;