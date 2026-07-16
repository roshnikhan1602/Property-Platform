const cron = require("node-cron");

const Subscription = require("../models/Subscription");
const User = require("../models/User");

const sendEmail = require("../utils/sendEmail");

const subscriptionExpiryReminderEmail =
  require("../templates/subscriptionExpiryReminderEmail");

const subscriptionExpiredEmail =
  require("../templates/subscriptionExpiredEmail");


// Testing: runs every minute
// Later change to: "0 9 * * *"
cron.schedule("* * * * *", async () => {

  try {

    console.log(
      "Checking subscription expiry..."
    );


    const subscriptions =
      await Subscription.find({
        plan: {
          $in: ["Premium", "Elite"],
        },
      });


    for (const subscription of subscriptions) {


      const user =
        await User.findById(
          subscription.user
        );


      if (!user || !user.email) {
        continue;
      }


      const today = new Date();

      const expiryDate =
        new Date(
          subscription.endDate
        );


      const diff =
        Math.ceil(
          (expiryDate - today) /
          (1000 * 60 * 60 * 24)
        );


      console.log(
        user.email,
        subscription.plan,
        "days left:",
        diff,
        "status:",
        subscription.status
      );



      // ==============================
      // 7 DAYS EXPIRY REMINDER
      // ==============================

      if (
        diff === 7 &&
        subscription.status === "Active"
      ) {

        await sendEmail(
          user.email,
          "Your PropertyHub subscription expires soon ⏳",
          subscriptionExpiryReminderEmail(
            user.name,
            subscription.plan,
            subscription.endDate
          )
        );


        console.log(
          "Expiry reminder sent:",
          user.email
        );

      }



      // ==============================
      // EXPIRED SUBSCRIPTION
      // ==============================

if (diff <= 0) {

  if (subscription.status !== "Expired") {

    subscription.status = "Expired";

    await subscription.save();

  }


  await sendEmail(
    user.email,
    "Your PropertyHub subscription has expired",
    subscriptionExpiredEmail(
      user.name,
      subscription.plan
    )
  );


  console.log(
    "Expired email sent:",
    user.email
  );

}

    }


  } catch(error){

    console.log(
      "Subscription cron error:",
      error.message
    );

  }

});