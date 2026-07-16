const subscriptionExpiryReminderEmail = (
  name,
  plan,
  endDate
) => {
  return `
  <div style="
    font-family: Arial, sans-serif;
    padding:20px;
    color:#333;
  ">

    <h2 style="color:#2563eb;">
      Your PropertyHub ${plan} Plan Expires Soon ⏳
    </h2>


    <p>
      Hi ${name},
    </p>


    <p>
      This is a reminder that your
      <b>${plan}</b> subscription will expire soon.
    </p>


    <h3>
      Subscription Details:
    </h3>


    <ul>
      <li>
        <b>Plan:</b> ${plan}
      </li>

      <li>
        <b>Expiry Date:</b>
        ${new Date(endDate).toLocaleDateString("en-IN")}
      </li>
    </ul>


    <p>
      Renew your subscription to continue enjoying:
    </p>


    <ul>
      <li>Higher property listing limits</li>
      <li>More PG listings</li>
      <li>Premium visibility</li>
      <li>Better property reach</li>
    </ul>


    <p>
      Don't miss out on growing your property business 🚀
    </p>


    <br/>

    <b>
      PropertyHub Team
    </b>

  </div>
  `;
};


module.exports = subscriptionExpiryReminderEmail;