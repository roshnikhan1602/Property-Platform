const welcomeUserEmail = (name) => {
  return `
    <div style="
      font-family: Arial, sans-serif;
      color:#333;
      padding:20px;
    ">

      <h2 style="color:#2563eb;">
        Welcome to PropertyHub 🏠
      </h2>

      <p>
        Hi ${name},
      </p>

      <p>
        Thank you for joining PropertyHub.
      </p>

      <p>
        You can now explore properties, PGs,
        save your favourite listings and find
        your perfect place easily.
      </p>

      <h3>
        With PropertyHub you can:
      </h3>

      <ul>
        <li>Search properties and PGs</li>
        <li>Save favourite listings</li>
        <li>Connect with owners</li>
        <li>Enjoy a smooth property experience</li>
      </ul>

      <p>
        Happy exploring!
      </p>

      <br/>

      <b>
        PropertyHub Team
      </b>

    </div>
  `;
};


module.exports = welcomeUserEmail;