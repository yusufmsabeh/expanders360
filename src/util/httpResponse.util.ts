function httpResponseUtil(status: number, message: string, data: any = {}) {
  return {
    status,
    message,
    data,
  };
}

export default httpResponseUtil;
