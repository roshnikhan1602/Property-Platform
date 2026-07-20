const welcomeOwnerEmail = (name) => {
  return `
    <div style="
      font-family: Arial, sans-serif;
      color:#333;
      padding:20px;
    ">

      <h2 style="
        color:#2563eb;
      ">
        Welcome to PropertyHub as an Owner 🚀
      </h2>


      <p>
        Hi ${name},
      </p>


      <p>
        Congratulations! 🎉
      </p>


      <p>
        You are now an Owner on PropertyHub.
        You can start adding and managing your
        properties and PG listings.
      </p>


      <h3>
        With your Owner account you can:
      </h3>


      <ul>
        <li>Add your properties and PG listings</li>
        <li>Upload images and property details</li>
        <li>Manage your listings easily</li>
        <li>Track property views</li>
        <li>Grow your property business</li>
      </ul>


      <p>
        Start listing your property today and
        reach more users.
      </p>


      <br/>


      <b>
        PropertyHub Team
      </b>


    </div>
  `;
};


module.exports = welcomeOwnerEmail;