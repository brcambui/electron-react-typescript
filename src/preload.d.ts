import { getDate } from "./common/getDate"

declare global {
  interface Window {
    getDate: typeof getDate
  }
}