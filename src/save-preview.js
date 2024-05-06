export function savePreview(testName, rendered) {
  fetch("http://localhost:4300/preview", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      testName,
      preview: rendered,
    }),
  });
}

export function resetPreviews() {
  fetch("http://localhost:4300/preview", {
    method: "DELETE",
  });
}
