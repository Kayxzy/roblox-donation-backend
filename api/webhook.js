let donations = global.donations || []
global.donations = donations

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {

    const data = req.body

    const donation = {
      nama: data.donator_name || "Anonymous",
      amount: Number(data.amount) || 0,
      message: data.message || "",
      email: data.email || "",
      id: data.id || Date.now().toString(),
      timestamp: Date.now()
    }

    donations.push(donation)

    res.status(200).json({
      success: true,
      received: donation
    })

  } catch (err) {
    res.status(500).json({ error: "Webhook error" })
  }

}
