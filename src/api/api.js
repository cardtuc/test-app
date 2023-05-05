export const getListOfLaunches = async (limit, offset) => {
  try {
    const response = await fetch(
      `https://lldev.thespacedevs.com/2.2.0/launch/?limit=${limit}&offset=${offset}`
    );

    return response.json();
  } catch (error) {
    console.error('error', error);
  }
};

export const getLaunchById = async (id) => {
  try {
    const response = await fetch(`https://lldev.thespacedevs.com/2.2.0/launch/${id}`);

    return response.json();
  } catch (error) {
    console.error('error', error);
  }
};
