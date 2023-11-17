
  useEffect(() => {
    // In case you want to send data
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjQsInVzZXJuYW1lIjoiZG9sbGFyc3RpciIsInJlYmF0ZT0-IjoiMTQuMDAwIiwiZW1haWwiOiJmcmVkb29AZ21haWwuY29tIiwiYmFsYW5jZSI6Ijg4MzY2MDUzLjAwMDAiLCJhY2NvdW50X3R5cGUiOiIxIiwiYXV0aF90eXBlIjoyLCJvdHBfZW5hYmxlZCI6IjAiLCJsYXN0X2xvZ2luIjoiMjAyMy0xMS0xNiAyMzowMDoxMSIsImxhc3RfbG9naW5faXAiOiIxOTIuMTY4LjE5OS4xMDkiLCJncmVldGluZyI6IndlbGNvbWUiLCJleHBpcnkiOjE3MDczNDY4MTF9.Yvtm6FiZZ0szBPr8SD2GjI639yOqF1yVcgP9wFUOdIc
    if (token == "") return;
    if (token == null) return;
    if (token === undefined) return;

    const params = {
      token: token,
    };
    const queryString = new URLSearchParams(params).toString();

    // Prepare the channel URL (Endpoint where we should listen for messages, e.g., sse_server.php)
    const url = "http://192.168.199.120:8081/channel.php?" + queryString;

    // Create a new EventSource object
    let eventSource = new EventSource(url);

    // Define the event listener to handle incoming events
    eventSource.addEventListener("message", function (event) {
      const eventData = JSON.parse(event.data);
      console.log("Received event:", eventData);
      setValue(eventData.message);
      setUsername(eventData.username);
      setAction(eventData.action);
    });

    // Handle errors and connection closures
    // eventSource.addEventListener("error", function (event) {
    //   if (event.readyState === EventSource.CLOSED) {
    //     console.log("Connection closed.");
    //   } else {
    //     console.log("Error occurred:", event);
    //   }
    // });
  }, [token]);