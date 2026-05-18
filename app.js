const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;





// ============================
// Webhook Verify
// ============================

app.get("/webhook", (req, res) => {

  const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];

        if (mode && token === VERIFY_TOKEN) {
            console.log("Webhook Verified");
                return res.status(200).send(challenge);
                  }

                    res.sendStatus(403);
                    });





                    // ============================
                    // Receive Messages
                    // ============================

                    app.post("/webhook", async (req, res) => {

                      try {

                          const body = req.body;

                              console.log(JSON.stringify(body, null, 2));

                                  const message =
                                        body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

                                            if (message) {

                                                  const from = message.from;
                                                        const type = message.type;

                                                              console.log("Message Type:", type);





                                                                    // ============================
                                                                          // Text
                                                                                // ============================

                                                                                      if (type === "text") {

                                                                                              const text = message.text.body;

                                                                                                      console.log("Text:", text);

                                                                                                              await sendTextMessage(
                                                                                                                        from,
                                                                                                                                  "تم استلام رسالتك: " + text
                                                                                                                                          );
                                                                                                                                                }





                                                                                                                                                      // ============================
                                                                                                                                                            // Image
                                                                                                                                                                  // ============================

                                                                                                                                                                        if (type === "image") {

                                                                                                                                                                                console.log("Image Received");

                                                                                                                                                                                        await sendTextMessage(
                                                                                                                                                                                                  from,
                                                                                                                                                                                                            "تم استلام الصورة"
                                                                                                                                                                                                                    );
                                                                                                                                                                                                                          }





                                                                                                                                                                                                                                // ============================
                                                                                                                                                                                                                                      // Video
                                                                                                                                                                                                                                            // ============================

                                                                                                                                                                                                                                                  if (type === "video") {

                                                                                                                                                                                                                                                          console.log("Video Received");

                                                                                                                                                                                                                                                                  await sendTextMessage(
                                                                                                                                                                                                                                                                            from,
                                                                                                                                                                                                                                                                                      "تم استلام الفيديو"
                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                    }





                                                                                                                                                                                                                                                                                                          // ============================
                                                                                                                                                                                                                                                                                                                // Audio
                                                                                                                                                                                                                                                                                                                      // ============================

                                                                                                                                                                                                                                                                                                                            if (type === "audio") {

                                                                                                                                                                                                                                                                                                                                    console.log("Audio Received");

                                                                                                                                                                                                                                                                                                                                            await sendTextMessage(
                                                                                                                                                                                                                                                                                                                                                      from,
                                                                                                                                                                                                                                                                                                                                                                "تم استلام الصوت"
                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                              }





                                                                                                                                                                                                                                                                                                                                                                                    // ============================
                                                                                                                                                                                                                                                                                                                                                                                          // Document PDF
                                                                                                                                                                                                                                                                                                                                                                                                // ============================

                                                                                                                                                                                                                                                                                                                                                                                                      if (type === "document") {

                                                                                                                                                                                                                                                                                                                                                                                                              console.log("Document Received");

                                                                                                                                                                                                                                                                                                                                                                                                                      await sendTextMessage(
                                                                                                                                                                                                                                                                                                                                                                                                                                from,
                                                                                                                                                                                                                                                                                                                                                                                                                                          "تم استلام الملف"
                                                                                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                                                                                        }





                                                                                                                                                                                                                                                                                                                                                                                                                                                              // ============================
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // Contacts
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          // ============================

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if (type === "contacts") {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        console.log("Contact Received");

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                await sendTextMessage(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          from,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    "تم استلام جهة الاتصال"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          res.sendStatus(200);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            } catch (error) {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                console.log(error.response?.data || error.message);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    res.sendStatus(500);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      });





                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      // ============================
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      // Send Text Message
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      // ============================

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      async function sendTextMessage(to, text) {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        await axios({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            method: "POST",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                url:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          headers: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Authorization: `Bearer ${WHATSAPP_TOKEN}`,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      "Content-Type": "application/json",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              data: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    messaging_product: "whatsapp",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          to: to,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                type: "text",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      text: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              body: text,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }





                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          // ============================
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          // Server
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          // ============================

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          const PORT = process.env.PORT || 3000;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          app.listen(PORT, () => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            console.log("Server Running");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });