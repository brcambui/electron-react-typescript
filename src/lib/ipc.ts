import { webContents } from 'electron'

export const sendIpcMessage = (channel: string, message: any) => {
  const context = webContents.getAllWebContents()[0]
  context.send(channel, message)
}