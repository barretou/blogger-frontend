import { defineStore } from "pinia"

export type ToastSeverity = "success" | "info" | "warn" | "error"

export interface ToastMessage {
  id: string
  severity: ToastSeverity
  summary?: string
  detail: string
  life?: number
}

interface ToastState {
  queue: ToastMessage[]
}

const GENERIC_MESSAGES = {
  success: "Operation completed successfully.",
  error: "Something went wrong. Please try again."
}

export const useToastStore = defineStore("toast", {
  state: (): ToastState => ({
    queue: []
  }),

  actions: {
    show(message: Omit<ToastMessage, "id">) {
      const id = crypto.randomUUID()

      this.queue.push({
        id,
        life: 3000,
        ...message
      })
    },

    success(detail?: string) {
      this.show({
        severity: "success",
        summary: "Success",
        detail: detail ?? GENERIC_MESSAGES.success
      })
    },

    error(err?: unknown) {
      let detail = GENERIC_MESSAGES.error

      if (typeof err === "string") {
        detail = err
      }

      if (err instanceof Error && err.message) {
        detail = err.message
      }

      this.show({
        severity: "error",
        summary: "Error",
        detail
      })
    },

    remove(id: string) {
      this.queue = this.queue.filter(t => t.id !== id)
    }
  }
})