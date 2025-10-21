// Test script for dataURLtoFile function

// Helper: Convert base64 Data URL to File object (safe version)
const dataURLtoFile = (dataUrl, filename) => {
  if (!dataUrl || typeof dataUrl !== "string") {
    throw new Error("Invalid data URL");
  }

  const arr = dataUrl.split(",");
  if (arr.length < 2) {
    throw new Error("Malformed data URL (missing comma separator)");
  }

  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Unable to extract MIME type from data URL");
  }

  const mime = mimeMatch[1];
  if (!mime || !mime.includes("/")) {
    throw new Error("Unable to extract MIME type from data URL");
  }

  try {
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    throw new Error("Unable to extract MIME type from data URL");
  }
};

// Test cases
const tests = [
  {
    name: "Valid data URL",
    input: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "test.png"],
    expectError: false
  },
  {
    name: "Invalid data URL - not a string",
    input: [null, "test.png"],
    expectError: true
  },
  {
    name: "Malformed data URL - missing comma",
    input: ["data:image/png;base64", "test.png"],
    expectError: true
  },
  {
    name: "Invalid MIME type - no slash",
    input: ["data:imagepng;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "test.png"],
    expectError: true
  },
  {
    name: "Invalid base64",
    input: ["data:image/png;base64,invalidbase64", "test.png"],
    expectError: true
  },
  {
    name: "Empty string",
    input: ["", "test.png"],
    expectError: true
  }
];

tests.forEach(test => {
  try {
    const result = dataURLtoFile(...test.input);
    if (test.expectError) {
      console.log(`FAIL: ${test.name} - Expected error but got result: ${result}`);
    } else {
      console.log(`PASS: ${test.name} - Got file: ${result.name}, type: ${result.type}`);
    }
  } catch (error) {
    if (test.expectError) {
      console.log(`PASS: ${test.name} - Got expected error: ${error.message}`);
    } else {
      console.log(`FAIL: ${test.name} - Unexpected error: ${error.message}`);
    }
  }
});
