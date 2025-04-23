import { Header } from "@/components/header"
import { TrainRunningStatusForm } from "@/components/train-running-status-form"
import { TrainRunningStatusResult } from "@/components/train-running-status-result"

export default function RunningStatusPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">Live Train Running Status</h1>
          <div className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
            LIVE
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <TrainRunningStatusForm />
          </div>
        </div>

        <TrainRunningStatusResult />
      </div>
    </main>
  )
}
