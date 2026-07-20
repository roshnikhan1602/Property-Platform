const subscriptionExpiredEmail = (
  name,
  plan
) => {
  return `
  <div style="
    font-family: Arial, sans-serif;
    padding:20px;
    color:#333;
  ">


    <h2 style="color:#dc2626;">
      Your PropertyHub Subscription Has Expired
    </h2>


    <p>
      Hi ${name},
    </p>


    <p>
      Your <b>${plan}</b> subscription has expired.
    </p>


    <p>
      Your account has been moved to the Free plan.
    </p>


    <p>
      Upgrade again to continue enjoying:
    </p>


    <ul>
      <li>Higher listing limits</li>
      <li>Priority visibility</li>
      <li>Premium features</li>
      <li>Better reach for your properties</li>
    </ul>


    <p>
      We would love to have you back on PropertyHub.
    </p>


    <br/>

    <b>
      PropertyHub Team
    </b>


  </div>
  `;
};


module.exports = subscriptionExpiredEmail;