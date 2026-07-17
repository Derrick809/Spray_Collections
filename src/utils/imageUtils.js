export const fileToDataUrl = async (file) => {
  if (!file || typeof file.arrayBuffer !== 'function') {
    return null;
  }

  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return `data:${file.type || 'application/octet-stream'};base64,${btoa(binary)}`;
};
