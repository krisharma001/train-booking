"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Settings,
  Wallet,
  HelpCircle,
  CreditCard,
  Shield,
  Clock,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CustomerServiceFAQ } from "@/components/customer-service-faq"

interface Booking {
  id: string
  type: string
  from: string
  fromCode: string
  to: string
  toCode: string
  date: string
  trainNumber: string
  trainName: string
  status: "success" | "failed"
}

export function CustomerServiceContent() {
  const [bookings] = useState<Booking[]>([
    {
      id: "1",
      type: "Train to Anand Vihar TRM",
      from: "JBN",
      fromCode: "JBN",
      to: "ANVT",
      toCode: "ANVT",
      date: "Tue, 25 Mar",
      trainNumber: "12487",
      trainName: "Seemanchal Exp",
      status: "success",
    },
    {
      id: "2",
      type: "Train to Anand Vihar TRM",
      from: "JBN",
      fromCode: "JBN",
      to: "ANVT",
      toCode: "ANVT",
      date: "Tue, 25 Mar",
      trainNumber: "12487",
      trainName: "Seemanchal Exp",
      status: "failed",
    },
    {
      id: "3",
      type: "Train to Delhi Shahdara",
      from: "AFR",
      fromCode: "AFR",
      to: "DSA",
      toCode: "DSA",
      date: "Fri, 12 Jan",
      trainNumber: "12035",
      trainName: "Purnagiri Janst",
      status: "success",
    },
  ])

  const [activeTab, setActiveTab] = useState("help")

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Hi Krish Sharma, need help with your recent booking?</h1>

      <div className="flex overflow-x-auto gap-4 pb-4 mb-8">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-sm p-4 min-w-[300px] flex gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="India Gate"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">{booking.type}</div>
              <div className="font-medium">
                {booking.fromCode} → {booking.toCode}
              </div>
              <div className="text-sm text-gray-600">
                {booking.date} • {booking.trainNumber} {booking.trainName}
              </div>
              <div
                className={`mt-2 text-sm px-2 py-0.5 rounded-sm inline-block ${
                  booking.status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                Booking {booking.status === "success" ? "Successful" : "Failed"}
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center min-w-[40px]">
          <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Tabs defaultValue="help" onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start p-0 bg-transparent border-b rounded-none h-auto">
                <TabsTrigger
                  value="help"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-6"
                >
                  Help Topics
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-6"
                >
                  Contact Us
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-6"
                >
                  Live Chat
                </TabsTrigger>
              </TabsList>

              <TabsContent value="help" className="p-6">
                <h2 className="text-xl font-bold mb-6">Quick Guide</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link href="/profile" className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <Settings className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Account Settings</h3>
                      <p className="text-sm text-gray-600">Update email, phone no. or password</p>
                    </div>
                  </Link>

                  <Link href="/wallet" className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <Wallet className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Trainiac money</h3>
                      <p className="text-sm text-gray-600">View Trainiac money transaction details and rules</p>
                    </div>
                  </Link>

                  <Link href="/help/booking" className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Pre-booking Queries</h3>
                      <p className="text-sm text-gray-600">Facing issue while booking? Not able to book?</p>
                    </div>
                  </Link>

                  <Link href="/wallet/max" className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <Wallet className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Trainiac money max</h3>
                      <p className="text-sm text-gray-600">Seamless instant refunds</p>
                    </div>
                  </Link>

                  <Link href="/assured" className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Trainiac assured</h3>
                      <p className="text-sm text-gray-600">Get free cancellation benefits</p>
                    </div>
                  </Link>

                  <Link href="/card" className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Trainiac AU Credit Card</h3>
                      <p className="text-sm text-gray-600">Your Gateway To Exclusive Perks</p>
                    </div>
                  </Link>

                  <Link href="/payment" className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Manage Payment Methods</h3>
                      <p className="text-sm text-gray-600">Delete saved cards or link/delink wallets</p>
                    </div>
                  </Link>
                </div>

                <CustomerServiceFAQ />
              </TabsContent>

              <TabsContent value="contact" className="p-6">
                <h2 className="text-xl font-bold mb-6">Contact Us</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <Phone className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                    <h3 className="font-medium text-lg mb-1">Call Us</h3>
                    <p className="text-gray-600 mb-3">24/7 Customer Support</p>
                    <p className="font-medium text-lg">1800-123-4567</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <Mail className="h-8 w-8 mx-auto mb-3 text-green-600" />
                    <h3 className="font-medium text-lg mb-1">Email Us</h3>
                    <p className="text-gray-600 mb-3">We'll respond within 24 hours</p>
                    <p className="font-medium">support@trainiac.com</p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg text-center">
                    <MessageCircle className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                    <h3 className="font-medium text-lg mb-1">Live Chat</h3>
                    <p className="text-gray-600 mb-3">Chat with our support team</p>
                    <Button size="sm">Start Chat</Button>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-lg mb-4">Send us a message</h3>

                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="What is your message about?" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="How can we help you?" rows={5} />
                    </div>

                    <Button type="submit">Send Message</Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="chat" className="p-6">
                <div className="text-center py-12">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h2 className="text-xl font-bold mb-2">Start a Live Chat</h2>
                  <p className="text-gray-600 mb-6">
                    Our support team is online and ready to help you with any questions
                  </p>
                  <Button size="lg">Connect with Support Agent</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-center mb-6">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Support"
                width={150}
                height={150}
                className="h-auto"
              />
            </div>

            <h2 className="text-xl font-bold text-center mb-4">All your queries are resolved!</h2>

            <Link href="/chat-history" className="flex items-center justify-between p-4 border rounded-lg mt-6">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Past Chat Threads</h3>
                  <p className="text-sm text-gray-600">View your past conversations here</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
