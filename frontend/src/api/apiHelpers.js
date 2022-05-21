import Cookie from 'js-cookie'

const apiHelpers = { }

apiHelpers.getCsrfConfig = () => {
  return {
    withCredentials: true, 
    headers: {
      'X-CSRFToken': Cookie.get("csrftoken")
    }
  }
}

apiHelpers.tryCatchFetch = async (axiosCall) => {
  try {
    const response = await axiosCall() 
    return response.data ? response.data : { message:"success" } 
  }
  catch (e) {
    console.error("tryCatchFetch ERROR:", e.response ? e.response.data : e)
    return null
  }
}

export default apiHelpers