app.post('/webhook', (req, res) => {
  console.log("=== رسالة جديدة ===");
  console.log(JSON.stringify(req.body, null, 2));
  console.log("==================");
  
  res.sendStatus(200);
});# facebook-webhook100
