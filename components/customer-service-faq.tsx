"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function CustomerServiceFAQ() {
  const [activeCategory, setActiveCategory] = useState("booking")

  const faqCategories = [
    { id: "booking", name: "Booking" },
    { id: "cancellation", name: "Cancellation & Refund" },
    { id: "payment", name: "Payment" },
    { id: "account", name: "Account" },
    { id: "tatkal", name: "Tatkal Booking" },
  ]

  const faqItems = {
    booking: [
      {
        question: "How do I book a train ticket?",
        answer:
          "To book a train ticket, search for trains by entering your source, destination, and travel date. Select your preferred train and class, enter passenger details, and proceed to payment. Once payment is complete, your ticket will be confirmed and sent to your email and phone.",
      },
      {
        question: "What information do I need to book a ticket?",
        answer:
          "You need to provide source and destination stations, travel date, passenger details (name, age, gender), and contact information. For certain quotas, additional details like ID proof may be required.",
      },
      {
        question: "Can I book a ticket for someone else?",
        answer:
          "Yes, you can book tickets for friends and family. Just enter their details correctly during the booking process. You can save frequent travelers in your account for quicker bookings in the future.",
      },
      {
        question: "How far in advance can I book a train ticket?",
        answer:
          "Regular train tickets can be booked up to 120 days in advance (excluding the date of journey). Tatkal tickets can only be booked one day before the journey date.",
      },
    ],
    cancellation: [
      {
        question: "How do I cancel my train ticket?",
        answer:
          "To cancel your ticket, go to 'My Trips' section, select the booking you want to cancel, and click on the 'Cancel Ticket' button. Follow the instructions to complete the cancellation process.",
      },
      {
        question: "What is the refund policy?",
        answer:
          "Refund amount depends on when you cancel the ticket. Cancellations done more than 48 hours before departure receive a higher refund. Cancellation charges are deducted as per railway rules. With Trainiac Assured, you can get enhanced refund benefits.",
      },
      {
        question: "How long does it take to receive a refund?",
        answer:
          "Refunds are typically processed within 5-7 working days, depending on your payment method. If you have Trainiac Money Max, you can receive instant refunds directly to your Trainiac wallet.",
      },
    ],
    payment: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept credit/debit cards, net banking, UPI, wallets, and EMI options from major banks. You can also use Trainiac Money for faster checkouts.",
      },
      {
        question: "Is it safe to save my card details?",
        answer:
          "Yes, we use industry-standard encryption to protect your payment information. Your card details are securely stored in compliance with PCI DSS standards.",
      },
      {
        question: "My payment was deducted but I didn't get a ticket",
        answer:
          "If your payment was deducted but you didn't receive a ticket confirmation, please check the 'My Trips' section. If the booking is not listed, the amount will be automatically refunded within 5-7 working days. You can also contact our customer support for assistance.",
      },
    ],
    account: [
      {
        question: "How do I create an account?",
        answer:
          "Click on the 'Login' button and select 'Create Account'. Enter your email, phone number, and create a password. Verify your email and phone number to complete the registration process.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click on 'Login', then 'Forgot Password'. Enter your registered email address or phone number to receive a password reset link. Follow the instructions in the email/SMS to create a new password.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          "Go to 'My Profile' section after logging in. Click on 'Edit Profile' to update your personal information, contact details, and preferences.",
      },
    ],
    tatkal: [
      {
        question: "What is Tatkal booking?",
        answer:
          "Tatkal booking is a facility to book tickets at short notice, typically one day before the journey date. Tatkal tickets are charged at a premium over regular fares.",
      },
      {
        question: "When does Tatkal booking open?",
        answer:
          "Tatkal booking opens at 10:00 AM for AC classes and 11:00 AM for non-AC classes, one day before the journey date (excluding the journey date).",
      },
      {
        question: "What is Premium Tatkal?",
        answer:
          "Premium Tatkal is a dynamic fare system where ticket prices may increase based on demand. These tickets are available alongside regular Tatkal tickets but with no concessions applicable.",
      },
    ],
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>

      <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
        {faqCategories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === category.id ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqItems[activeCategory as keyof typeof faqItems].map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
