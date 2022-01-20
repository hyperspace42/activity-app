async function getActivityApi() {
  try {
    const response = await fetch('http://www.boredapi.com/api/activity/').then(res => res.json());
    return response;
  } catch (e) {
    console.log(e);
  }
}

export default getActivityApi;
