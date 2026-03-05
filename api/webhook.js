export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {

    const data = req.body

    console.log("Donation received:", data)

    const donor = data.donator_name || "Anonymous"
    const amount = data.amount || 0
    const message = data.message || ""

    console.log(`Donasi dari ${donor} sebesar ${amount}`)

    return res.status(200).json({
      status: "success",
      donor,
      amount,
      message
    })

  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Webhook error" })
  }

}
