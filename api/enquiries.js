
module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    const name =
      typeof body?.name === "string" ? body.name.trim() : "";

    const phone =
      typeof body?.phone === "string" ? body.phone.trim() : "";

    const email =
      typeof body?.email === "string" ? body.email.trim() : "";

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

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
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

    return res.status(201).json({
      success: true,
      message: "Enquiry received successfully.",
    });
  } catch (error) {
    console.error("Enquiry submission failed:", error.message);

    return res.status(500).json({
      error: "Could not process your enquiry.",
    });
  }
};
