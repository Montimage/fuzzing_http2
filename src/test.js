function generateHexPayload(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    }
    return result;
  }
  
  const hexPayload = generateHexPayload(20);
  console.log(hexPayload);
  