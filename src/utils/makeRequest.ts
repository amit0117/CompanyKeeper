import toast from 'react-hot-toast';
async function makeRequest(url: string, config: any) {
  try {
    const result = await fetch(url, config);
    if (!result.ok) {
      const response = await result.json();
      toast.error(response.message);
      return null;
    }
    return await result.json();
  } catch (error: any) {
    toast.error('Something went wrong.');
    console.error('error is', error);
  }
}
export { makeRequest };
