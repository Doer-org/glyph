export const getEnv = () => {
  return {
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
    wsURL: process.env.NEXT_PUBLIC_WS_URL,
    clientURL: process.env.NEXT_PUBLIC_FRONT_URL,
  }
}
