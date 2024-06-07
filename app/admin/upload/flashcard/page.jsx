'use client'
import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { motion } from 'framer-motion'
import { FaSpinner } from 'react-icons/fa'
import { db } from '@/firebase'; // Adjust the path to your firebase configuration
import { doc, getDoc } from 'firebase/firestore';
import toast, { Toaster } from "react-hot-toast"
import FlashCardUpload from "../../components/FlashCardUpload"

const Page = () => {
  const [pin, setPin] = useState('');
  const [isPinCorrect, setIsPinCorrect] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [correctPin, setCorrectPin] = useState('');

  useEffect(() => {
    const fetchPin = async () => {
      const docRef = doc(db, "pins", "pin");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCorrectPin(docSnap.data().pinvalue);
      } else {
        console.error("No such document!");
      }
    }

    fetchPin();
  }, []);

  const handlePinChange = (value) => {
    setPin(value);
  }

  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setShowSpinner(true);
      setTimeout(() => {
        setIsPinCorrect(true);
        setShowSpinner(false);
        toast.success("Welcome")
      }, []);
    } else {
      toast.error("Incorrect PIN");
    }
  }

  useEffect(() => {
    if (isPinCorrect) {
      setShowSpinner(false);
    }
  }, [isPinCorrect]);

  return (
    <div className="h-screen flex items-center content-center justify-center p-20">
      <Toaster />
      {!isPinCorrect ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Enter Your PIN</CardTitle>
              <CardDescription>Enter Your PIN to Continue</CardDescription>
            </CardHeader>
            <CardContent>
              <InputOTP maxLength={6} onChange={handlePinChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className='w-full' onClick={handlePinSubmit}>Submit</Button>
            </CardFooter>
          </Card>
        </motion.div>
      ) : showSpinner ? (
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-[350px] p-10">
            <CardContent>
              <FaSpinner className="text-4xl animate-spin" />
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <FlashCardUpload />
      )}
    </div>
  )
}

export default Page
