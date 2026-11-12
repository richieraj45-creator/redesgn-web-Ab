
module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (
      !name ||
      !phone ||
      !message ||
      name.length > 150 ||
      phone.length > 40 ||
      email.length > 254 ||
      message.length > 10000
    ) {
      return res.status(400).json({
        error: "Please check the enquiry details.",
      });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        error: "Please enter a valid email address.",
      });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !secretKey) {
      console.error("Enquiry API configuration is incomplete.");
      return res.status(500).json({
        error: "Enquiry service is not configured.",
      });
    }

    // Save the enquiry first.
    const response = await fetch(
      `${supabaseUrl}/rest/v1/enquiries`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: secretKey,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name,
          phone,
          email: email || null,
          message,
        }),
      }
    );

    if (!response.ok) {
      console.error(
        "Supabase enquiry insertion failed:",
        response.status
      );
      return res.status(502).json({
        error: "Could not save your enquiry.",
      });
    }

    // Attempt the Resend test notification.
    let emailTest = "skipped";

    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      try {
        const emailResponse = await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Ask aran Binjraj <onboarding@resend.dev>",
              to: ["delivered@resend.dev"],
              subject: "New website enquiry - Test",
              text: [
                "A new website enquiry has been received.",
                "",
                `Name: ${name}`,
                `Phone: ${phone}`,
                `Email: ${email || "Not provided"}`,
                "",
                "Message:",
                message,
                "",
                "This is a Resend integration test.",
              ].join("\n"),
            }),
          }
        );

        if (emailResponse.ok) {
          emailTest = "sent";
        } else {
          const errorDetails = await emailResponse.text();
          console.error(
            "Resend email failed:",
            emailResponse.status,
            errorDetails
          );
          emailTest = "failed";
        }
      } catch (emailError) {
        console.error("Resend request failed:", emailError.message);
        emailTest = "failed";
      }
    } else {
      console.error("RESEND_API_KEY is not configured.");
    }

    // A saved enquiry remains successful even if email fails.
    return res.status(201).json({
      success: true,
      message: "Enquiry received successfully.",
      emailTest,
    });
  } catch (error) {
    console.error("Enquiry submission failed:", error.message);
    return res.status(500).json({
      error: "Could not process your enquiry.",
    });
  }
};
