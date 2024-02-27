import { contextBridge } from "electron"

import { getDate } from "@/common/getDate"

contextBridge.exposeInMainWorld("getDate", getDate)